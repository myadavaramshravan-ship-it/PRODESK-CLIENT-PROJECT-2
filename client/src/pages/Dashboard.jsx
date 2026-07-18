import DashboardLayout from "../components/layout/DashboardLayout";

import DashboardCards from "../components/dashboard/DashboardCards";

import RecentTickets from "../components/dashboard/RecentTickets";

export default function Dashboard(){

    return (

        <DashboardLayout>

            <h1>
                Dashboard
            </h1>

            <DashboardCards/>

            <RecentTickets/>

        </DashboardLayout>

    );

}