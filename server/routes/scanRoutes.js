const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    scanTicket
} = require("../controllers/scanController");

router.post(
    "/",
    authMiddleware,
    scanTicket
);

module.exports = router;