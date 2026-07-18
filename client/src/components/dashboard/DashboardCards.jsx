import { useEffect, useState } from "react";
import API from "../../services/api";

import StatsCard from "./StatsCard";

export default function DashboardCards(){
    const [stats,setStats] = useState({
        totalTickets:0,
        activeTickets:0,
        usedTickets:0,
        cancelledTickets:0

    });

    useEffect(()=>{
        const fetchDashboard = async()=>{
            try{
                const res = await API.get("/analytics/dashboard");
                console.log(
                    "Dashboard Data:",
                    res.data
                );
                setStats({
                    totalTickets:
                    res.data.dashboard?.totalTickets || 0,
                    activeTickets:
                    res.data.dashboard?.activeTickets || 0,

                    usedTickets:
                    res.data.dashboard?.usedTickets || 0,
                    cancelledTickets:
                    res.data.dashboard?.cancelledTickets || 0
                });

            }
            catch(err){

                console.log(
                    "Dashboard Error:",
                    err
                );
            }
        };
        fetchDashboard();
    },[]);
    const cards=[
        {
            title:"Total Tickets",
            value:stats.totalTickets
        },

        {
            title:"Active Tickets",
            value:stats.activeTickets
        },

        {
            title:"Used Tickets",
            value:stats.usedTickets
        },

        {
            title:"Cancelled Tickets",
            value:stats.cancelledTickets
        }

    ];

    return (

        <div className="dashboard-cards">
            {
                cards.map((card,index)=>(
                    <StatsCard
                        key={index}
                        title={card.title}
                        value={card.value}
                    />
                ))
            }
        </div>
    );
}