const mongoose = require("mongoose");


const ticketSchema = new mongoose.Schema(

{

    ticketNumber:{

        type:String,

        required:true,

        unique:true

    },


    customerName:{

        type:String,

        required:true

    },


    customerEmail:{

        type:String,

        required:true

    },


    eventName:{

        type:String,

        required:true

    },


    eventDate:{

        type:Date,

        required:true

    },


    qrCode:{

        type:String,

        required:true

    },


    status:{

        type:String,

        enum:[

            "active",

            "used",

            "cancelled"

        ],

        default:"active"

    },


    generatedBy:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    }


},

{

    timestamps:true

}

);



module.exports =
mongoose.model(
    "Ticket",
    ticketSchema
);