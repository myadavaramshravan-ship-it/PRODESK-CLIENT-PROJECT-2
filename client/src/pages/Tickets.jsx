import DashboardLayout from "../components/layout/DashboardLayout";

import TicketForm from "../components/ticket/TicketForm";
import TicketTable from "../components/ticket/TicketTable";


export default function Tickets(){

    return (

        <DashboardLayout>


            <h1>
                Tickets
            </h1>


            <div className="ticket-section">


                <TicketForm
                    refresh={()=>window.location.reload()}
                />


                <TicketTable/>


            </div>


        </DashboardLayout>

    );

}