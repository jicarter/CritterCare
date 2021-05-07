import { CritterFoodContext } from "../../providers/CritterFoodProvider";
import { TagContext } from "../../providers/TagProvider";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react"
import { CritterFoodDelete } from "./CritterFoodDelete";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
    CardFooter
} from "reactstrap";


const CritterFoodList = () => {
    const { food, getCritterFoodById, setCritterFood } = useContext(TagContext);
    const { addCritterFood, setCritterFood, deleteCritterFood } = useContext(CritterFoodContext);
    const { id } = useParams();
    const history = useHistory();
    const [CritterFood, setCritterFood] = useState("");
    const [CritterFood, setCritterFood] = useState([]);
    const [CritterFood, setCritterFood] = useState({});
    
    useEffect(() => {
        getCritterFoodById().then(setCritterFood);
    }, []);


    const handleSaveCritterFoodButton = () => {
        const newCritterFood = {
            ...CritterFood
        };
        
        newCritterFood.Id = Id
        newCritterFood.foodId = foodId
        newCritterFood.critterId = CritterId
        newCritterFood.notes = notes

        addCritterFood(newCritterFood)
            .then(history.push(`/Critter/${id}`))
    };

    
    return (

        <>
            <FormGroup>

                <Label for="CritterFood">Give your Critter some Food </Label><br></br>
                <select id="CritterFood" onChange={(e) => setCritterFood(e.target.value)}>
                    <option value="0">Select a Food </option>
                    {
                        food.map(f => (
                            <option key={f.id} value={f.id}>
                                {f.type}
                            </option>
                        ))
                    }
                </select>
                <Button onClick={handleSaveCritterFoodButton}>Add </Button>
            </FormGroup>
            {CritterFood.map(cf => (
            
            <Card className="m-4">
                <CardBody>
                    <p>{cf.Notes}</p>
                </CardBody>
                <CardFooter>
                    <Button color="danger" onClick={() => history.push(`/CritterFood/delete/${pt.id}`)}>Delete</Button>
                </CardFooter>
            </Card>

            ))}
        </>
    )
}

export default CritterFoodList;