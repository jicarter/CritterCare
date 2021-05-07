import React, { useState, useContext, useEffect } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { CritterContext } from '../../Providers/CritterProvider';
import { useHistory, useParams } from "react-router-dom";


export const CritterEdit = () => {

    const { updateCritter, getCritterById, getUserCritter } = useContext(CritterContext)

    const { id } = useParams();
    const [Critter, setCritter] = useState({});
    const history = useHistory();
    
    // form field states
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [sex, setSex] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [notes, setNotes] = useState("");

    const userProfile = sessionStorage.getItem("userProfile");




    useEffect(() => {
        getCritterById(id).then(setCritter)
            .then(getUserCritter)
    }, []);

    // Once the Critter has been set in state, update the form with previous post info
    useEffect(() => {

        setName(Critter.name)
        setBreed(Critter.breed)
        setSex(Critter.sex)
        setImageLocation(Critter.imageLocation)
        setNotes(Critter.notes)
    }, [Critter])


    const submit = (e) => {

        const updatedCritter = {
            ...Critter
        };
        
        updatedCritter.name = name
        updatedCritter.breed = breed
        updatedCritter.sex = sex
        updatedCritter.imageLocation = imageLocation
        updatedCritter.notes = notes

        updateCritter(updatedCritter).then((c) => {
            // Navigate the user back to the home route
            
            history.push(`/Critters/${Critter.critterId}`);
            
        });
    }
    const cancel = () => {
        history.push(`/Critters/${id}}`);
    };

    if (Critter === null) {
        return null
    }

    return (
        <div className="container pt-4">
            <div className="row justify-Details-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input id="name" onChange={(e) => setName(e.target.value)} value={name} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="breed">Breed</Label>
                                <Input type="textarea"
                                    id="breed"
                                    onChange={(e) => setBreed(e.target.value)}
                                    value={breed}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="sex">Sex</Label>
                                <Input type="textarea"
                                    id="sex"
                                    onChange={(e) => setSex(e.target.value)}
                                    value={sex}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="image">Image</Label>
                                <Input type="textarea"
                                    id="image"
                                    onChange={(e) => setImageLocation(e.target.value)}
                                    value={imageLocation}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="notes">Notes</Label>
                                <Input type="textarea"
                                    id="notes"
                                    onChange={(e) => setNotes(e.target.value)}
                                    value={notes}
                                    rows="10"
                                />
                            </FormGroup>
                        </Form>
                        <Button color="info" onClick={submit}>
                            SUBMIT
                    </Button>
                        <Button color="info" onClick={cancel}>
                            CANCEL
                    </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default CritterEdit;
