import React, { useContext } from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";


const Critter = ({ Critter }) => {
    const history = useHistory();
    const userProfile = sessionStorage.getItem("userProfile");
    var currentUser = JSON.parse(userProfile);



    const editCritter = () => {

        history.push(`/Critter/edit/${Critter.id}`);
    };

    if (currentUser.id === Critter.userProfileId) {

        return (
            <Card className="m-4">
                <CardBody>
                    <p>{Critter.Name}</p>
                    <p>{Critter.Breed}</p>
                    <p>{Critter.Sex}</p>
                    <p>{Critter.ImageLocation}</p>
                    <p>{Critter.Notes}</p>
                </CardBody>
                <Button onClick={editCritter}>Edit</Button>
            </Card>
        )
    } else {
        return (

            <Card className="m-4">
                <CardBody>
                    <p>{Critter.Name}</p>
                    <p>{Critter.Breed}</p>
                    <p>{Critter.Sex}</p>
                    <p>{Critter.ImageLocation}</p>
                    <p>{Critter.Notes}</p>
                </CardBody>
            </Card>
        )

    }
}

export default Critter;
