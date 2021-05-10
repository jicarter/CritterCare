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
import { FoodContext } from '../../Providers/FoodProvider';
import { useHistory, useParams } from "react-router-dom";


export const FoodEdit = () => {

    const { updateFood, getFoodById, getUserFood } = useContext(FoodContext)

    const { id } = useParams();
    const [Food, setFood] = useState({});
    const history = useHistory();
    
    // form field states
    const [type, setType] = useState("");
    const [details, setDetails] = useState("");

    const userProfile = sessionStorage.getItem("userProfile");
    var currentUser = JSON.parse(userProfile)



    useEffect(() => {
        getFoodById(id).then(setFood)
    }, []);

   
    useEffect(() => {

        setType(Food.type)
        setDetails(Food.details)
    }, [Food])


    const submit = (e) => {

        const updatedFood = {
            ...Food
        };
        
        updatedFood.type = type
        updatedFood.details = details

        updateFood(updatedFood).then((c) => {
            // Navigate the user back to the home route
            
            history.push(`/Food/${currentUser.id}`);
            
        });
    }
    const cancel = () => {
        history.push(`/Food/${currentUser.id}}`);
    };

    if (Food === null) {
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

export default FoodEdit;
