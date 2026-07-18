const Ticket = require("../models/Ticket");
const QRCode = require("qrcode");



// ===============================
// CREATE TICKET
// ===============================

const createTicket = async(req,res)=>{

    try{


        const ticketNumber =
        "TKT-" + Date.now();



        const qrData = JSON.stringify({

            ticketNumber

        });



        const qrCode =
        await QRCode.toDataURL(qrData);



        const ticket = await Ticket.create({

            ticketNumber,

            customerName:req.body.customerName,

            customerEmail:req.body.customerEmail,

            eventName:req.body.eventName,


            eventDate:new Date(),


            generatedBy:req.user.id,


            qrCode,


            status:"active"

        });



        res.status(201).json({

            success:true,

            message:"Ticket generated successfully",

            ticket

        });


    }
    catch(error){


        console.log(error);


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};




// ===============================
// GET ALL TICKETS
// ===============================

const getTickets = async(req,res)=>{

    try{


        const tickets =
        await Ticket.find()
        .sort({
            createdAt:-1
        });



        res.json({

            success:true,

            tickets

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};





// ===============================
// GET SINGLE TICKET
// ===============================

const getTicketById = async(req,res)=>{


    try{


        const ticket =
        await Ticket.findById(
            req.params.id
        );


        res.json({

            success:true,

            ticket

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }


};
// ===============================
// UPDATE TICKET
// ===============================

const updateTicket = async (req, res) => {

    try {

        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {

            return res.status(404).json({

                success: false,
                message: "Ticket not found"

            });

        }

        ticket.customerName =
            req.body.customerName || ticket.customerName;

        ticket.customerEmail =
            req.body.customerEmail || ticket.customerEmail;

        ticket.eventName =
            req.body.eventName || ticket.eventName;

        ticket.eventDate =
            req.body.eventDate || ticket.eventDate;

        await ticket.save();

        res.json({

            success: true,

            message: "Ticket updated successfully",

            ticket

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





// ===============================
// DELETE TICKET
// ===============================

const deleteTicket = async(req,res)=>{


    try{


        await Ticket.findByIdAndDelete(
            req.params.id
        );


        res.json({

            success:true,

            message:"Ticket deleted"

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }


};





// ===============================
// FIND TICKET USING QR
// ===============================

const scanTicket = async(req,res)=>{


    try{


        const ticket =
        await Ticket.findOne({

            ticketNumber:
            req.params.ticketNumber

        });



        if(!ticket){

            return res.status(404).json({

                success:false,

                message:"Invalid ticket"

            });

        }



        res.json({

            success:true,

            ticket

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};





// ===============================
// VALIDATE TICKET
// ACTIVE -> USED
// ===============================

const validateTicket = async(req,res)=>{


    try{


        const ticket =
        await Ticket.findOne({

            ticketNumber:
            req.params.ticketNumber

        });



        if(!ticket){


            return res.status(404).json({

                success:false,

                message:"Invalid ticket"

            });


        }





        if(ticket.status === "used"){


            return res.status(400).json({

                success:false,

                message:"Ticket already scanned",

                ticket

            });


        }





        ticket.status="used";


        await ticket.save();




        res.json({

            success:true,

            message:"Entry allowed",

            ticket

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};





module.exports = {

    createTicket,

    getTickets,

    getTicketById,

    updateTicket,

    deleteTicket,

    scanTicket,

    validateTicket

};