const express = require('express');
const path = require('path');

// Initialize Express application
const app = express();

// Get port from environment variable or use default
const PORT = process.env.PORT || 3000;

// Middleware: Serve static files from the root directory
// This allows serving HTML, CSS, JS, and other static assets
app.use(express.static(path.join(__dirname)));

// Route: Serve the main index.html file
// This is the primary entry point for the application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).json({ 
        status: 'error', 
        message: 'Failed to serve the main page' 
      });
    }
  });
});

// Route: Health check endpoint
// Used to verify the server is running and responsive
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'JunAiKey server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware: Handle 404 errors
// This catches any requests to undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    status: 'error', 
    message: 'Resource not found',
    path: req.path
  });
});

// Error handling middleware: Handle server errors
// This catches any unhandled errors in the application
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({ 
    status: 'error', 
    message: err.message || 'Internal server error'
  });
});

// Export the app for testing
module.exports = app;

// Only start the server if this file is run directly
// This allows importing the app for testing without starting the server
if (require.main === module) {
  // Start the server and listen on the specified port
  const server = app.listen(PORT, () => {
    console.log(`🌟 JunAiKey Development Server`);
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${__dirname}`);
    console.log(`\n💡 Press Ctrl+C to stop the server`);
  });

  // Graceful shutdown handling
  // This ensures the server closes properly when terminated
  process.on('SIGTERM', () => {
    console.log('\n⚠️  SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('✅ HTTP server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('\n⚠️  SIGINT signal received: closing HTTP server');
    server.close(() => {
      console.log('✅ HTTP server closed');
      process.exit(0);
    });
  });
}
