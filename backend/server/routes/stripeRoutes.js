import express from "express";
// Importing the necessary functions from the stripe controller module
import * as stripeCtrl from "../controllers/stripeController.js";

// Creating an instance of Express router
const router = express.Router();

// Endpoint to handle POST requests for creating a checkout session
router.post('/create-checkout-session', stripeCtrl.createSession);

// Endpoint to handle GET requests for retrieving session status
router.get('/session-status', stripeCtrl.sessionStatus);

// Exporting the router to be used in other parts of the application
export { router };

