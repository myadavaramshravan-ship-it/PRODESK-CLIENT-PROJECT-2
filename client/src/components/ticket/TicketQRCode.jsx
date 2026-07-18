export default function TicketQRCode({
    ticket,
    close
}){


    if(!ticket){

        return null;

    }



    return (

        <div className="qr-overlay">


            <div className="qr-modal">


                <button
                className="qr-close"
                onClick={close}
                >

                    ×

                </button>



                <h2>
                    Ticket QR Code
                </h2>



                <img

                src={ticket.qrCode}

                alt="Ticket QR Code"

                className="qr-image"

                />



                <div className="qr-details">


                    <p>

                        <strong>
                            Ticket:
                        </strong>

                        {ticket.ticketNumber}

                    </p>



                    <p>

                        <strong>
                            Customer:
                        </strong>

                        {ticket.customerName}

                    </p>



                    <p>

                        <strong>
                            Event:
                        </strong>

                        {ticket.eventName}

                    </p>



                    <p>

                        <strong>
                            Status:
                        </strong>

                        {ticket.status}

                    </p>


                </div>


            </div>


        </div>

    );

}