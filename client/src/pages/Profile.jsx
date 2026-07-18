import DashboardLayout from "../components/layout/DashboardLayout";


export default function Profile(){

    return (

        <DashboardLayout>


            <div className="profile-page">


                <div className="profile-header">

                    <h1>
                        Profile
                    </h1>

                    <p>
                        Manage your account information
                    </p>

                </div>



                <div className="profile-card">


                    <div className="profile-avatar">

                        S

                    </div>



                    <div className="profile-info">


                        <h2>
                            Shravan Myadavaram
                        </h2>


                        <p>
                            Email:
                            <span>
                                user@gmail.com
                            </span>
                        </p>


                        <p>
                            Role:
                            <span>
                                Admin
                            </span>
                        </p>


                        <p>
                            Account:
                            <span>
                                Active
                            </span>
                        </p>


                    </div>


                </div>



            </div>


        </DashboardLayout>

    );

}