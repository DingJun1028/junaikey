const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require('firebase-admin');
const crypto = require('crypto');
require("dotenv").config();

const supervisor = require("./agents/supervisor");

/**
 * Security Middleware Configuration
 * SACRED_API_KEY (required): master key for protected /api/* routes
 * SACRED_HMAC_REQUIRED (optional=true/false): when true enforces HMAC
 * SACRED_ALLOWED_DRIFT (seconds): acceptable timestamp drift (default 300)
 * HMAC Algorithm: hex(HMAC_SHA256(JSON.stringify(body)+ts, SACRED_API_KEY))
 * Headers:
 *   X-Sacred-Key: <SACRED_API_KEY>
 *   X-Ts: <unix seconds>
 *   X-Sign: <hmac signature>
 */
const SACRED_KEY = process.env.SACRED_API_KEY || '';
const HMAC_REQUIRED = (process.env.SACRED_HMAC_REQUIRED || 'false') === 'true';
const ALLOWED_DRIFT = parseInt(process.env.SACRED_ALLOWED_DRIFT || '300', 10);

function verifyHmac(req) {
  if (!HMAC_REQUIRED) return true;
  const tsHeader = req.headers['x-ts'];
  const signHeader = req.headers['x-sign'];
  if (!tsHeader || !signHeader) return false;
  const ts = parseInt(tsHeader, 10);
  if (Number.isNaN(ts)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - ts) > ALLOWED_DRIFT) return false;
  const raw = JSON.stringify(req.body) + tsHeader; // canonicalization requirement
  const expected = crypto
    .createHmac('sha256', SACRED_KEY)
    .update(raw)
    .digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signHeader));
  } catch (_) {
    return false; // length mismatch or other error
  }
}

function sacredGuard(req, res, next) {
  if (req.path.startsWith('/api/')) {
    if (!SACRED_KEY) {
      return res.status(500).json({ error: 'Server misconfiguration: SACRED_API_KEY missing' });
    }
    const clientKey = req.headers['x-sacred-key'];
    if (clientKey !== SACRED_KEY) {
      return res.status(401).json({ error: 'Unauthorized (Key)' });
    }
    if (!verifyHmac(req)) {
      return res.status(401).json({ error: 'Unauthorized (HMAC)' });
    }
  }
  next();
}

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sacredGuard); // apply guard before routes

admin.initializeApp();

app.post("/api/execute-sacred-command", async (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).send({ error: "Command object is required" });
  }

  try {
    const response = await supervisor.generate(command);
    res.status(200).send({ response });
  } catch (error) {
    console.error("Error in supervisor agent:", error);
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
});

app.post("/api/add-knowledge", async (req, res) => {
  const { category, data } = req.body;

  if (!category || !data) {
    return res.status(400).json({ status: 'error', message: 'Missing category or data in request body' });
  }

  let collectionPath;
  // Basic validation and mapping categories to Firestore collections
  switch (category) {
    case 'core_dimension':
      collectionPath = 'coreDimensions';
      // Add basic data validation for core_dimension if needed
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
  } catch (error) {
    console.error('Error adding knowledge:', error);
    return res.status(500).json({ status: 'error', message: 'Failed to add knowledge', errorCode: error.message });
  }
});

exports.api = functions.https.onRequest(app);

