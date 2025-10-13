import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto'; // Node.js built-in module
import { AITableSyncService } from './src/modules/AITableConnector/AITableSyncService.js'; // Note the .js extension
import { Logger } from './src/utils/Logger.js'; // Note the .js extension

const app = express();
const PORT = process.env.WEBHOOK_PORT || 3001;
const AITABLE_WEBHOOK_SECRET = process.env.AITABLE_WEBHOOK_SECRET; // Get webhook secret from environment variables

// Middleware to get raw body for signature verification
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf; // Store the raw body for later use
  }
}));

// Initialize AITableSyncService (ensure it's a singleton instance)
const aitableSyncService = AITableSyncService.Instance;

// Webhook endpoint for AITable
app.post('/webhook/aitable', async (req, res) => {
  Logger.info('Received AITable Webhook', { headers: req.headers, body: req.body });

  // 1. Validate Webhook Secret
  if (!AITABLE_WEBHOOK_SECRET) {
    Logger.error('AITABLE_WEBHOOK_SECRET is not configured in environment variables. Webhook verification skipped.');
    // In a production environment, you might want to reject requests if the secret is missing.
    // For development, we might allow it to proceed with a warning.
    // return res.status(500).send('Webhook secret not configured.');
  } else {
    const signature = req.headers['x-aitable-signature'];
    if (!signature) {
      Logger.warn('Webhook received without X-AITable-Signature header.', req.body);
      return res.status(401).send('Unauthorized: Signature missing');
    }

    // Calculate HMAC-SHA256 signature
    const hmac = crypto.createHmac('sha256', AITABLE_WEBHOOK_SECRET);
    hmac.update(req.rawBody);
    const calculatedSignature = hmac.digest('hex');

    if (calculatedSignature !== signature) {
      Logger.warn('Webhook signature verification failed.', { receivedSignature: signature, calculatedSignature, body: req.body });
      return res.status(401).send('Unauthorized: Invalid signature');
    }
    Logger.info('Webhook signature verified successfully.');
  }

  // 2. Basic payload validation
  if (!req.body || !req.body.event || !req.body.data) {
    Logger.warn('Invalid AITable Webhook payload received: missing event or data.', req.body);
    return res.status(400).send('Invalid payload');
  }

  try {
    const result = await aitableSyncService.processWebhookPayload(req.body);
    if (result.success) {
      Logger.info('Webhook payload processed successfully.', result);
      res.status(200).send('Webhook received and processed');
    } else {
      Logger.error('Failed to process webhook payload.', result.error, result.details);
      res.status(500).send(`Failed to process webhook: ${result.error}`);
    }
  } catch (error) {
    Logger.error('Error processing AITable webhook.', error, req.body);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

// Start the server
app.listen(PORT, () => {
  Logger.info(`AITable Webhook Server listening on port ${PORT}`);
  console.log(`AITable Webhook Server listening on port ${PORT}`);
});