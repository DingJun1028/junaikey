const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Basic route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'JunAiKey server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌟 JunAiKey Development Server`);
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Serving static files from: ${__dirname}`);
  console.log(`\n💡 Press Ctrl+C to stop the server`);
});
