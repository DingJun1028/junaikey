const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const supervisor = require("./agents/supervisor");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).send({ error: "Prompt is required" });
  }

  try {
    const response = await supervisor.generate(prompt);
    res.status(200).send({ response });
  } catch (error) {
    console.error("Error in supervisor agent:", error);
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
});

exports.api = functions.https.onRequest(app);
