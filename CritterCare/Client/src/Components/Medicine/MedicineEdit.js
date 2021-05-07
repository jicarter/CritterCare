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
import { MedicineContext } from '../../Providers/MedicineProvider';
import { useHistory, useParams } from "react-router-dom";


export const MedicineEdit = () => {

    const { updateMedicine, getMedicineById, getUserMeds } = useContext(MedicineContext)

    const { id } = useParams();
    const [Medicine, setMedicine] = useState({});
    const history = useHistory();
    
    // form field states
    const [type, setType] = useState("");
    const [details, setDetails] = useState("");

    const userProfile = sessionStorage.getItem("userProfile");




    useEffect(() => {
        getMedicineById(id).then(setMedicine)
            .then(getUserMeds)
    }, []);

    // Once the Medicine has been set in state, update the form with previous post info
    useEffect(() => {

        setType(Medicine.type)
        setDetails(Medicine.details)
    }, [Medicine])


    const submit = (e) => {

        const updatedMedicine = {
            ...Medicine
        };
        
        updatedMedicine.type = type
        updatedMedicine.details = details

        updateMedicine(updatedMedicine).then((c) => {
            // Navigate the user back to the home route
            
            history.push(`/Medicines/${Medicine.critterId}`);
            
        });
    }
    const cancel = () => {
        history.push(`/Medicines/${id}}`);
    };

    if (Medicine === null) {
        return null
    }

    return (
        <div className="container pt-4">
            <div className="row justify-Details-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="Type">Type</Label>
                                <Input id="Type" onChange={(e) => setType(e.target.value)} value={type} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Details">Details</Label>
                                <Input type="textarea"
                                    id="Details"
                                    onChange={(e) => setDetails(e.target.value)}
                                    value={details}
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

export default MedicineEdit;
