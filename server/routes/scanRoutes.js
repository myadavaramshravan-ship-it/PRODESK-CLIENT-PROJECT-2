const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    scanTicket
} = require("../controllers/scanController");


// POST /api/scan
router.post(
    "/",
    authMiddleware,
    scanTicket
);

module.exports = router;