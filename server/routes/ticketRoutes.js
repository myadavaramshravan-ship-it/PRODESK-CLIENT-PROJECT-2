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

router.post(
    "/",
    authMiddleware,
    createTicket
);

router.get(
    "/",
    authMiddleware,
    getTickets
);

router.get(
    "/:id",
    authMiddleware,
    getTicketById
);

router.put(
    "/:id",
    authMiddleware,
    updateTicket
);


router.delete(
    "/:id",
    authMiddleware,
    deleteTicket
);


router.get(
    "/scan/:ticketNumber",
    authMiddleware,
    scanTicket
);


router.put(
    "/validate/:ticketNumber",
    authMiddleware,
    validateTicket
);

module.exports = router;