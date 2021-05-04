import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const UserProfile = () => {
    const { getUserProfileById } = useContext(UserProfileContext);
    const [profile, setProfile] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getUserProfileById().then(setProfile);
    }, []);



    return (
        <>
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <table>
                        <thead>
                            <tr>
                                <th>First Name Last Name</th>
                                <th>Display Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                <tr key={p.id}>
                                    <td>{p.firstName} {p.lastName}</td>
                                    <td>{p.displayName}</td>
                                    <td>{p.userType.name}</td>
                                    <td>
                                        <Button onClick={() => history.push(`/userprofile/edit/${p.id}`)}>Edit</Button>
                                    </td>
                                </tr>
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )

}

export default UserProfile;
