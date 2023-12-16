import express from "express";
// Importing the necessary functions from the stripe controller module
import * as stripeCtrl from "../controllers/stripeController.js";
import * as webhookCtrl from "../controllers/stripeWebhookCtrl.js";
// Creating an instance of Express router
const router = express.Router();


// Endpoint to handle POST requests for creating a checkout session
router.post('/create-checkout-session', stripeCtrl.createSession);

// Endpoint to handle GET requests for retrieving session status
router.get('/session-status', stripeCtrl.sessionStatus);

router.post('/webhook', express.raw({ type: 'application/json' }), webhookCtrl.handleWebhook);
// Exporting the router to be used in other parts of the application
export { router };

