"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load .env only outside production
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
// NOTE: When compiled to lib/index.js, this file lives in functions/lib.
// We require the supervisor from the repo root-level functions/agents via '../agents/...'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const supervisor = require('../agents/supervisor');
admin.initializeApp();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Keep '/api' in the route paths to match Hosting rewrite from '/api/**'
app.post('/api/execute-sacred-command', async (req, res) => {
    const { command } = req.body;
    if (!command) {
        return res.status(400).send({ error: 'Command object is required' });
    }
    try {
        const response = await supervisor.generate(command);
        res.status(200).send({ response });
    }
    catch (error) {
        console.error('Error in supervisor agent:', error);
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
});
app.post('/api/add-knowledge', async (req, res) => {
    const { category, data } = req.body;
    if (!category || !data) {
        return res.status(400).json({ status: 'error', message: 'Missing category or data in request body' });
    }
    let collectionPath;
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
    }
    catch (error) {
        console.error('Error adding knowledge:', error);
        return res.status(500).json({ status: 'error', message: 'Failed to add knowledge', errorCode: error?.message });
    }
});
exports.api = functions.region('asia-east1').https.onRequest(app);
