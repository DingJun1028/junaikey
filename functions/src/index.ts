import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load .env only outside production
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// NOTE: When compiled to lib/index.js, this file lives in functions/lib.
// We require the supervisor from the repo root-level functions/agents via '../agents/...'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const supervisor = require('../agents/supervisor');

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Keep '/api' in the route paths to match Hosting rewrite from '/api/**'
app.post('/api/execute-sacred-command', async (req: Request, res: Response) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).send({ error: 'Command object is required' });
  }

  try {
    const response = await supervisor.generate(command);
    res.status(200).send({ response });
  } catch (error) {
    console.error('Error in supervisor agent:', error);
    res.status(500).send({ error: 'An error occurred while processing your request.' });
  }
});

app.post('/api/add-knowledge', async (req: Request, res: Response) => {
  const { category, data } = req.body as { category?: string; data?: any };

  if (!category || !data) {
    return res.status(400).json({ status: 'error', message: 'Missing category or data in request body' });
  }

  let collectionPath: string;

  switch (category) {
    case 'core_dimension':
      collectionPath = 'coreDimensions';
      if (!data.title || !data.label || !data.description || !data.details) {
        return res.status(400).json({ status: 'error', message: 'Missing required fields for core_dimension' });
      }
      break;
    case 'cosmic_axiom':
      collectionPath = 'cosmicAxioms';
      if (!data.title || !data.description || !data.content) {
        return res.status(400).json({ status: 'error', message: 'Missing required fields for cosmic_axiom' });
      }
      break;
    case 'elemental_law':
      collectionPath = 'elementalLaws';
      if (!data.name || !data.spirit || !data.essence) {
        return res.status(400).json({ status: 'error', message: 'Missing required fields for elemental_law' });
      }
      break;
    case 'professional_avatar':
      collectionPath = 'professionalAvatars';
      if (!data.name || !data.description) {
        return res.status(400).json({ status: 'error', message: 'Missing required fields for professional_avatar' });
      }
      break;
    default:
      return res.status(400).json({ status: 'error', message: `Invalid knowledge category: ${category}` });
  }

  try {
    const docRef = await admin.firestore().collection(collectionPath).add(data);
    return res.status(200).json({ status: 'success', message: 'Knowledge added successfully', knowledgeId: docRef.id });
  } catch (error: any) {
    console.error('Error adding knowledge:', error);
    return res.status(500).json({ status: 'error', message: 'Failed to add knowledge', errorCode: error?.message });
  }
});

export const api = functions.region('asia-east1').https.onRequest(app);