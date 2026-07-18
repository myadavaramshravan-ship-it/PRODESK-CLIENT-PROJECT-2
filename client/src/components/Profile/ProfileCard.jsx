export default function ProfileCard({user}){


    return (

        <div className="profile-card">


            <div className="profile-avatar">

                {
                    user.name
                    ?.charAt(0)
                    .toUpperCase()
                }

            </div>



            <div className="profile-details">


                <h2>
                    {user.name}
                </h2>


                <p>
                    Email:
                    <span>
                        {user.email}
                    </span>
                </p>


                <p>
                    Role:
                    <span>
                        {user.role || "User"}
                    </span>
                </p>


                <p>
                    Joined:
                    <span>
                        {
                          new Date(
                            user.createdAt
                          ).toLocaleDateString()
                        }
                    </span>
                </p>


            </div>


        </div>

    );

}