/**
 * Tag Server Tests
 * Tests for the JunAiKey Omni-Tag System backend API
 */

const request = require('supertest');
const app = require('./tag-server.cjs');

describe('Tag Server API', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('metrics');
    });
  });

  describe('POST /api/data/ingest', () => {
    it('should ingest data and generate tags', async () => {
      const testData = {
        id: 'test_ingest_001',
        content: 'This is a test about machine learning and artificial intelligence',
        type: 'text',
        source: 'test'
      };

      const response = await request(app)
        .post('/api/data/ingest')
        .send(testData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', testData.id);
      expect(response.body.data).toHaveProperty('tags');
      expect(Array.isArray(response.body.data.tags)).toBe(true);
      expect(response.body.data.tags.length).toBeGreaterThan(0);
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/data/ingest')
        .send({ id: 'test_002' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/data/:id', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/data/ingest')
        .send({
          id: 'test_get_001',
          content: 'Test content for retrieval',
          type: 'text'
        });
    });

    it('should retrieve data by ID', async () => {
      const response = await request(app)
        .get('/api/data/test_get_001')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', 'test_get_001');
      expect(response.body.data).toHaveProperty('content');
    });

    it('should return 404 for non-existent data', async () => {
      const response = await request(app)
        .get('/api/data/nonexistent_id')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/tags/query', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/data/ingest')
        .send({
          id: 'test_query_001',
          content: 'Machine learning and artificial intelligence',
          type: 'text'
        });
    });

    it('should query data by tags', async () => {
      const response = await request(app)
        .get('/api/tags/query?tags=machine,learning')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return 400 for missing tags parameter', async () => {
      const response = await request(app)
        .get('/api/tags/query')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/feedback', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/data/ingest')
        .send({
          id: 'test_feedback_001',
          content: 'Test content for feedback',
          type: 'text'
        });
    });

    it('should accept feedback', async () => {
      const feedback = {
        dataId: 'test_feedback_001',
        action: 'accept'
      };

      const response = await request(app)
        .post('/api/feedback')
        .send(feedback)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.feedback).toHaveProperty('dataId', 'test_feedback_001');
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/feedback')
        .send({ dataId: 'test_feedback_001' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/metrics', () => {
    it('should return system metrics', async () => {
      const response = await request(app)
        .get('/api/metrics')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.metrics).toHaveProperty('totalDataItems');
      expect(response.body.metrics).toHaveProperty('totalTags');
    });
  });

  describe('GET /api/tags', () => {
    it('should return all available tags', async () => {
      const response = await request(app)
        .get('/api/tags')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.tags)).toBe(true);
    });
  });

  describe('DELETE /api/data/:id', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/data/ingest')
        .send({
          id: 'test_delete_001',
          content: 'Test content for deletion',
          type: 'text'
        });
    });

    it('should delete data by ID', async () => {
      const response = await request(app)
        .delete('/api/data/test_delete_001')
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify deletion
      await request(app)
        .get('/api/data/test_delete_001')
        .expect(404);
    });

    it('should return 404 for non-existent data', async () => {
      const response = await request(app)
        .delete('/api/data/nonexistent_id')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});
