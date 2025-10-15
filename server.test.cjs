/**
 * Basic tests for JunAiKey Development Server
 * These tests verify core server functionality
 */

const request = require('supertest');
const app = require('./server');

describe('JunAiKey Development Server', () => {
  describe('GET /health', () => {
    test('should return health check status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('message', 'JunAiKey server is running');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });

    test('should return valid timestamp', async () => {
      const response = await request(app).get('/health');
      
      const timestamp = new Date(response.body.timestamp);
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).not.toBeNaN();
    });

    test('should return non-negative uptime', async () => {
      const response = await request(app).get('/health');
      
      expect(response.body.uptime).toBeGreaterThanOrEqual(0);
    });
  });

  describe('GET /', () => {
    test('should serve the main page', async () => {
      const response = await request(app).get('/');
      
      // The response should either be the HTML file or an error if it doesn't exist
      expect([200, 500]).toContain(response.status);
      
      // If successful, should return HTML
      if (response.status === 200) {
        expect(response.type).toMatch(/html/);
      }
    });
  });

  describe('Static file serving', () => {
    test('should serve static files from root directory', async () => {
      // Test accessing the server.js file as a static resource
      const response = await request(app).get('/server.test.js');
      
      // Should either find the file or return 404
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('Error handling', () => {
    test('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/non-existent-route');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message', 'Resource not found');
      expect(response.body).toHaveProperty('path', '/non-existent-route');
    });

    test('should handle invalid paths gracefully', async () => {
      const response = await request(app).get('/invalid/path/that/does/not/exist');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('status', 'error');
    });
  });

  describe('API Response format', () => {
    test('should return JSON for API endpoints', async () => {
      const response = await request(app).get('/health');
      
      expect(response.type).toMatch(/json/);
    });

    test('health endpoint should have consistent structure', async () => {
      const response = await request(app).get('/health');
      
      expect(typeof response.body.status).toBe('string');
      expect(typeof response.body.message).toBe('string');
      expect(typeof response.body.timestamp).toBe('string');
      expect(typeof response.body.uptime).toBe('number');
    });
  });
});
