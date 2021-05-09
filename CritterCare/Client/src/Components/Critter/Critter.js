import React, { useContext } from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";
import { CritterContext } from "../../Providers/CritterProvider";

const Critter = ({ Critter }) => {
    const history = useHistory();
    const userProfile = sessionStorage.getItem("userProfile");
    var currentUser = JSON.parse(userProfile);

    const { deleteCritter, getAllUserCritters } = useContext(CritterContext);

    const editCritter = () => {

        
        history.push(`/Critter/edit/${Critter.id}`);
    };
    
    const handleDeleteCritter = () => {
        
        if (window.confirm(`Are you sure you want to delete this critter?`)) {
            deleteCritter(Critter.id).then(getAllUserCritters);
            history.push(`/critter/${userProfile.id}`);
        }
    };

    if (currentUser.id === Critter.userProfileId) {

        return (
            <Card className="m-4">
                <CardBody>
                    <p>{Critter.name}</p>
                    <p>{Critter.breed}</p>
                    <p>{Critter.sex}</p>
                    <p>{Critter.imageLocation}</p>
                    <p>{Critter.notes}</p>
                </CardBody>
                <Button onClick={editCritter}>Edit</Button>
                <Button onClick={handleDeleteCritter}>Delete</Button>
                {/* <Button onClick={addCritterFood}>Add Food</Button>
                <Button onClick={addCritterMed}>Add Medicine</Button> */}
            </Card>
        )
    } else {
        return (

            <Card className="m-4">
                <CardBody>
                    <p>{Critter.name}</p>
                    <p>{Critter.breed}</p>
                    <p>{Critter.sex}</p>
                    <p>{Critter.imageLocation}</p>
                    <p>{Critter.notes}</p>
                </CardBody>
            </Card>
        )

    }
}

export default Critter;
