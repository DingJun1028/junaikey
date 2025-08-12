const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const supervisor = require("./agents/supervisor");

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

exports.api = functions.https.onRequest(app);
