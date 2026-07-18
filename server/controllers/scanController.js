const Ticket = require("../models/Ticket");
const QRScanLog = require("../models/QRScanLog");

const scanTicket = async (req, res) => {
    try {

        let { ticketNumber, device, location } = req.body;

        // Handle QR codes that contain JSON
        try {
            if (
                typeof ticketNumber === "string" &&
                ticketNumber.startsWith("{")
            ) {
                ticketNumber = JSON.parse(ticketNumber).ticketNumber;
            }
        } catch (err) {
            // Ignore if it's already plain text
        }

        if (!ticketNumber) {
            return res.status(400).json({
                success: false,
                message: "Ticket number is required",
            });
        }

        const ticket = await Ticket.findOne({ ticketNumber });

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found",
            });
        }

        if (ticket.status === "used") {
            return res.status(200).json({
                success: false,
                message: "Ticket Already Used",
                ticket,
            });
        }

        ticket.status = "used";
        await ticket.save();

        await QRScanLog.create({
            ticketId: ticket._id,
            scannedBy: req.user?._id || req.user?.id || null,
            device: device || "Web Scanner",
            location: location || "Unknown",
        });

        return res.status(200).json({
            success: true,
            message: "Ticket Verified",
            ticket,
        });

    } catch (error) {
        console.error("Scan Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    scanTicket,
};