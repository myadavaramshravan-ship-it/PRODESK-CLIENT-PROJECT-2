const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    logAction,

    getAnalytics,

    getDashboard

} = require("../controllers/analyticsController");



// ===============================
// DASHBOARD
// ===============================

router.get(
    "/dashboard",
    authMiddleware,
    getDashboard
);



// ===============================
// GET ANALYTICS LOGS
// ===============================

router.get(
    "/",
    authMiddleware,
    getAnalytics
);



// ===============================
// CREATE ANALYTICS LOG
// ===============================

router.post(
    "/",
    authMiddleware,
    logAction
);

module.exports = router;