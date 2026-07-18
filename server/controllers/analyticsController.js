const AnalyticsLog = require("../models/AnalyticsLog");
const Ticket = require("../models/Ticket");

const logAction = async (req, res) => {
  try {
    const { action, ticketId } = req.body;

    if (!action) {
      return res.status(400).json({
        success: false,
        message: "Action is required",
      });
    }

    const log = await AnalyticsLog.create({
      action,
      ticketId: ticketId || null,
      userId: req.user.id,
    });

    console.log(
      "[Analytics] User interacted with Ticket QR Code Generator Worker"
    );

    res.status(201).json({
      success: true,
      message: "Analytics logged successfully",
      data: log,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const logs = await AnalyticsLog.find()
      .populate("userId", "fullName email")
      .populate("ticketId", "ticketNumber")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getDashboard = async (req, res) => {

    try {

        const totalTickets =
        await Ticket.countDocuments();

        const activeTickets =
        await Ticket.countDocuments({
            status: "active"
        });

        const usedTickets =
        await Ticket.countDocuments({
            status: "used"
        });

        const cancelledTickets =
        await Ticket.countDocuments({
            status: "cancelled"
        });

        const recentTickets =
        await Ticket.find()
        .sort({
            createdAt: -1
        })
        .limit(5);

        res.json({

            success: true,

            dashboard: {

                totalTickets,

                activeTickets,

                usedTickets,

                cancelledTickets

            },

            recentTickets

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    logAction,

    getAnalytics,

    getDashboard

};