import { CritterMedsContext } from "../../providers/CritterMedsProvider";
import { TagContext } from "../../providers/TagProvider";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react"
import { CritterMedsDelete } from "./CritterMedsDelete";
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


const CritterMedsList = () => {
    const { medicine, getCritterMedsById, setCritterMeds } = useContext(TagContext);
    const { addCritterMeds, setCritterMeds, deleteCritterMeds } = useContext(CritterMedsContext);
    const { id } = useParams();
    const history = useHistory();
    const [CritterMeds, setCritterMeds] = useState("");
    const [CritterMeds, setCritterMeds] = useState([]);
    const [CritterMeds, setCritterMeds] = useState({});
    
    useEffect(() => {
        getCritterMedsById().then(setCritterMeds);
    }, []);


    const handleSaveCritterMedsButton = () => {
        const newCritterMeds = {
            ...CritterMeds
        };
        
        newCritterMeds.Id = Id
        newCritterMeds.medsId = medsId
        newCritterMeds.critterId = CritterId
        newCritterMeds.notes = notes

        addCritterMeds(newCritterMeds)
            .then(history.push(`/Critter/${id}`))
    };

    
    return (

        <>
            <FormGroup>

                <Label for="CritterMeds">Give your Critter some Medicine </Label><br></br>
                <select id="CritterMeds" onChange={(e) => setCritterMeds(e.target.value)}>
                    <option value="0">Select a Medicine </option>
                    {
                        medicine.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.type}
                            </option>
                        ))
                    }
                </select>
                <Button onClick={handleSaveCritterMedsButton}>Add </Button>
            </FormGroup>
            {CritterMeds.map(cm => (
            
            <Card className="m-4">
                <CardBody>
                    <p>{cm.Notes}</p>
                </CardBody>
                <CardFooter>
                    <Button color="danger" onClick={() => history.push(`/CritterMeds/delete/${pt.id}`)}>Delete</Button>
                </CardFooter>
            </Card>

            ))}
        </>
    )
}

export default CritterMedsList;