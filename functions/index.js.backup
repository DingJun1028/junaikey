const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require('firebase-admin');
require("dotenv").config();

const supervisor = require("./agents/supervisor");

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

