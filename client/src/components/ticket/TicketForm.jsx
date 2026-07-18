import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";


const TicketForm = ({ onCreated }) => {


    const [formData,setFormData] = useState({

        customerName:"",
        customerEmail:"",
        eventName:"",
        eventDate:""

    });



    const handleChange=(e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };




    const handleSubmit=async(e)=>{

        e.preventDefault();


        try{

            const response = await API.post(
                "/tickets",
                formData
            );


            toast.success(
                "Ticket generated successfully"
            );


            setFormData({

                customerName:"",
                customerEmail:"",
                eventName:"",
                eventDate:""

            });


            onCreated?.(response.data.ticket);


        }
        catch(error){

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };




    return (

        <section className="ticket-create-container">


            <div className="ticket-create-card">


                <div className="ticket-create-header">


                    <div>

                        <h1>
                            Create Ticket
                        </h1>


                        <p>
                            Generate a secure QR based event ticket
                        </p>

                    </div>


                    <div className="ticket-badge">

                        NEW

                    </div>


                </div>





                <form onSubmit={handleSubmit}>


                    <div className="ticket-form-grid">



                        <div className="input-field">

                            <label>
                                Customer Name
                            </label>

                            <input

                                type="text"

                                name="customerName"

                                value={formData.customerName}

                                onChange={handleChange}

                                placeholder="Enter full name"

                                required

                            />

                        </div>






                        <div className="input-field">

                            <label>
                                Email Address
                            </label>

                            <input

                                type="email"

                                name="customerEmail"

                                value={formData.customerEmail}

                                onChange={handleChange}

                                placeholder="customer@email.com"

                                required

                            />

                        </div>







                        <div className="input-field">

                            <label>
                                Event Name
                            </label>


                            <input

                                type="text"

                                name="eventName"

                                value={formData.eventName}

                                onChange={handleChange}

                                placeholder="Enter event title"

                                required

                            />

                        </div>







                        <div className="input-field">

                            <label>
                                Event Date
                            </label>


                            <input

                                type="date"

                                name="eventDate"

                                value={formData.eventDate}

                                onChange={handleChange}

                                required

                            />

                        </div>




                    </div>





                    <div className="form-footer">


                        <div className="security-text">

                            QR protected ticket generation

                        </div>



                        <button
                            className="generate-btn"
                            type="submit"
                        >

                            Generate QR Ticket

                        </button>



                    </div>




                </form>



            </div>


        </section>

    );

};


export default TicketForm;