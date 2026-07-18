const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    logAction,

    getAnalytics,

    getDashboard

} = require("../controllers/analyticsController");


router.get(
    "/dashboard",
    authMiddleware,
    getDashboard
);


router.get(
    "/",
    authMiddleware,
    getAnalytics
);

router.post(
    "/",
    authMiddleware,
    logAction
);

module.exports = router;