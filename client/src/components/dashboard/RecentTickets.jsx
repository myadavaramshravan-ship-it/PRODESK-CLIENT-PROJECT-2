import { useEffect, useState } from "react";
import API from "../../services/api";

export default function RecentTickets() {

    const [tickets, setTickets] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchRecentTickets();

    }, []);

    const fetchRecentTickets = async () => {

        try {

            const res = await API.get(
                "/analytics/dashboard"
            );

            setTickets(
                res.data.recentTickets || []
            );

        }
        catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    return (

        <div className="recent-ticket-card">

            <div className="recent-header">

                <h2>
                    Recent Tickets
                </h2>

            </div>

            {

                loading ?

                (

                    <p>
                        Loading...
                    </p>

                )

                :

                tickets.length === 0 ?

                (

                    <p>
                        No Tickets Found
                    </p>

                )

                :

                (

                    <table className="recent-table">

                        <thead>

                            <tr>

                                <th>
                                    Ticket
                                </th>

                                <th>
                                    Customer
                                </th>

                                <th>
                                    Event
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                tickets.map(ticket => (

                                    <tr
                                        key={ticket._id}
                                    >

                                        <td>

                                            {ticket.ticketNumber}

                                        </td>

                                        <td>

                                            {ticket.customerName}

                                        </td>

                                        <td>

                                            {ticket.eventName}

                                        </td>

                                        <td>

                                            <span
                                            className={`ticket-status ${ticket.status}`}
                                            >

                                                {ticket.status}

                                            </span>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                )

            }

        </div>

    );

}