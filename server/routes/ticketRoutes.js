const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    createTicket,

    getTickets,

    getTicketById,

    updateTicket,

    deleteTicket,

    scanTicket,

    validateTicket

} = require("../controllers/ticketController");



// ===============================
// CREATE TICKET
// ===============================

router.post(
    "/",
    authMiddleware,
    createTicket
);



// ===============================
// GET ALL TICKETS
// ===============================

router.get(
    "/",
    authMiddleware,
    getTickets
);



// ===============================
// GET SINGLE TICKET
// ===============================

router.get(
    "/:id",
    authMiddleware,
    getTicketById
);



// ===============================
// UPDATE TICKET
// ===============================

router.put(
    "/:id",
    authMiddleware,
    updateTicket
);



// ===============================
// DELETE TICKET
// ===============================

router.delete(
    "/:id",
    authMiddleware,
    deleteTicket
);



// ===============================
// SCAN QR
// ===============================

router.get(
    "/scan/:ticketNumber",
    authMiddleware,
    scanTicket
);



// ===============================
// VALIDATE TICKET
// ===============================

router.put(
    "/validate/:ticketNumber",
    authMiddleware,
    validateTicket
);

module.exports = router;