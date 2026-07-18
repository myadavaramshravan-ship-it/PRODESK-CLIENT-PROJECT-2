import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import API from "../../services/api";
import { useEffect } from "react";


const ScannerInput = () => {


    const [ticket,setTicket] = useState(null);
    const [error,setError] = useState("");



    useEffect(()=>{


        const scanner = new Html5QrcodeScanner(
    "reader",
    {
        fps:10,
        qrbox:{
            width:180,
            height:180
        },
        aspectRatio:1
    },
    false
);



        scanner.render(

            async(decodedText)=>{


                try{


                    scanner.clear();



                    let ticketNumber = decodedText;

                    try {
                    const qr = JSON.parse(decodedText);
                    ticketNumber = qr.ticketNumber;
                    } catch {
                   }

                   const response = await API.put(
                    `/tickets/validate/${ticketNumber}`
                    );



                    if(response.data.success){


                        setTicket(response.data.ticket);

                        setError("");

                    }
                    else{


                        setTicket(null);

                        setError(
                            response.data.message
                        );


                    }



                }
                catch(err){


                    setError(
                        err.response?.data?.message ||
                        "Invalid QR Code"
                    );


                }


            },

            (error)=>{

                console.log(error);

            }

        );



        return()=>{

            scanner.clear().catch(()=>{});

        };


    },[]);





    const scanAgain=()=>{


        window.location.reload();


    };






    return (


        <div className="scanner-page">


            <h2>
                Ticket QR Scanner
            </h2>



            <div 
                id="reader"
                className="qr-reader"
            ></div>

          {

          }

{
    ticket && (

        <div className="scan-result success">

            <div className="result-banner">

                <div className="result-icon success-icon">

                    ✓

                </div>

                <div className="result-info">

                    <h2>
                        Ticket Verified
                    </h2>

                    <p>
                        Entry has been approved for this ticket.
                    </p>

                </div>

                <span className="entry-badge success-badge">

                    ENTRY ALLOWED

                </span>

            </div>




            <div className="ticket-details">


                <div className="detail-card">

                    <label>
                        Ticket Number
                    </label>

                    <p>
                        {ticket.ticketNumber}
                    </p>

                </div>




                <div className="detail-card">

                    <label>
                        Customer Name
                    </label>

                    <p>
                        {ticket.customerName}
                    </p>

                </div>




                <div className="detail-card">

                    <label>
                        Email
                    </label>

                    <p>
                        {ticket.customerEmail}
                    </p>

                </div>




                <div className="detail-card">

                    <label>
                        Event
                    </label>

                    <p>
                        {ticket.eventName}
                    </p>

                </div>




                <div className="detail-card">

                    <label>
                        Event Date
                    </label>

                    <p>

                        {
                            new Date(
                                ticket.eventDate
                            ).toLocaleDateString()
                        }

                    </p>

                </div>




                <div className="detail-card">

                    <label>
                        Status
                    </label>

                    <p className="status-used">

                        {ticket.status}

                    </p>

                </div>


            </div>




            <button
                className="scan-again"
                onClick={scanAgain}
            >

                Scan Another Ticket

            </button>

        </div>

    )
}




{
    error && (

        <div className="scan-result failed">

            <div className="result-banner">

                <div className="result-icon failed-icon">

                    ✕

                </div>

                <div className="result-info">

                    <h2>

                        Ticket Verification Failed

                    </h2>

                    <p>

                        {error}

                    </p>

                </div>

                <span className="entry-badge failed-badge">

                    ENTRY DENIED

                </span>

            </div>


            <button
                className="scan-again"
                onClick={scanAgain}
            >

                Scan Again

            </button>

        </div>

    )
}



            {
                ticket && (


                    <div className="scan-result success">



                        <div className="result-header">


                            <h3>
                                ✓ Ticket Verified
                            </h3>


                            <span>
                                ENTRY ALLOWED
                            </span>


                        </div>





                        <div className="ticket-details">


                            <div>

                                <label>
                                    Ticket ID
                                </label>

                                <p>
                                    {ticket.ticketNumber}
                                </p>

                            </div>





                            <div>

                                <label>
                                    Customer Name
                                </label>

                                <p>
                                    {ticket.customerName}
                                </p>

                            </div>





                            <div>

                                <label>
                                    Email
                                </label>

                                <p>
                                    {ticket.customerEmail}
                                </p>

                            </div>





                            <div>

                                <label>
                                    Event
                                </label>

                                <p>
                                    {ticket.eventName}
                                </p>

                            </div>





                            <div>

                                <label>
                                    Event Date
                                </label>

                                <p>

                                {
                                    new Date(
                                        ticket.eventDate
                                    )
                                    .toLocaleDateString()
                                }

                                </p>

                            </div>





                            <div>

                                <label>
                                    Status
                                </label>


                                <p className="status-active">
                                    {ticket.status}
                                </p>


                            </div>



                        </div>





                        <button
                            className="scan-again"
                            onClick={scanAgain}
                        >
                            Scan Another Ticket
                        </button>



                    </div>


                )

            }






            {
                error && (


                    <div className="scan-result failed">



                        <div className="result-header">


                            <h3>
                                ❌ {error}
                            </h3>


                            <span>
                                ENTRY DENIED
                            </span>


                        </div>




                        <button
                            className="scan-again"
                            onClick={scanAgain}
                        >
                            Scan Again
                        </button>



                    </div>


                )
            }





        </div>


    );

};


export default ScannerInput;