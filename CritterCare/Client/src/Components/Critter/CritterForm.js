import React, { useContext, useEffect, useState } from "react"
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
  CardHeader
} from "reactstrap";
import { CritterContext } from '../../Providers/CritterProvider';
import { useHistory, useParams } from 'react-router-dom';

export const CritterForm = () => {
  const { addCritter, getCrittersByUserProfileId, userProfileId } = useContext(CritterContext)
  const history = useHistory();
  const { id } = useParams();
  const [Critter, setCritter] = useState({
    name: "",
    breed: "",
    sex: "",
    image: "",
    notes: ""
  })

  const handleControlledInputChange = (event) => {
    const newCritter = { ...Critter }

    newCritter[event.target.id] = event.target.value
    setCritter(newCritter)
  }

  const saveCritter = ()  => {

    addCritter({
    name: Critter.name,
    breed: Critter.breed,
    sex: Critter.sex,
    image: Critter.imageLocation,
    notes: Critter.notes,
    userProfileId: 1
    })
    .then(setCritter)
    .then(history.push(`/Critter/${id}`))
  }

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardHeader>
            <h2 className="CritterForm__title">Add Critter</h2>
          </CardHeader>
          <CardBody>
            <Form className="CritterForm">
              <FormGroup>
                <Label for="name">Name: </Label>
                <Input type="text" id="type" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name" value={Critter.name} />
              </FormGroup>
              <FormGroup>
                <Label for="breed">Breed: </Label>
                <Input type="textarea" id="breed" onChange={handleControlledInputChange} required autoFocus className="form-control"
                placeholder="Enter your Critter Breed here" value={Critter.breed} rows="10" />
              </FormGroup>
              <FormGroup>
                <Label for="sex">Sex: </Label>
                <Input type="textarea" id="sex" onChange={handleControlledInputChange} required autoFocus className="form-control"
                placeholder="Enter your Critter sex here" value={Critter.sex} rows="10" />
              </FormGroup>
              <FormGroup>
                <Label for="image">Image: </Label>
                <Input type="textarea" id="image" onChange={handleControlledInputChange} required autoFocus className="form-control"
                placeholder="Enter your Critter image here" value={Critter.imageLocation} rows="10" />
              </FormGroup>
              <FormGroup>
                <Label for="notes">Notes: </Label>
                <Input type="textarea" id="notes" onChange={handleControlledInputChange} required autoFocus className="form-control"
                placeholder="Enter your Critter notes here" value={Critter.notes} rows="10" />
              </FormGroup>
            </Form>
            <Button color="info" onClick={saveCritter}>Save Critter</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default CritterForm
