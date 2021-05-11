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
  const { addCritter, getCrittersByUserProfileId, getUserCritter } = useContext(CritterContext)
  const history = useHistory();
  const { id } = useParams();
  const [Critter, setCritter] = useState({
    name: "",
    breed: "",
    sex: "",
    imageLocation: "",
    notes: ""
  })

  const handleControlledInputChange = (event) => {
    const newCritter = { ...Critter }

    newCritter[event.target.id] = event.target.value
    setCritter(newCritter)
  }

  const saveCritter = ()  => {

    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile)

    const refreshPage = () => {
      getUserCritter(currentUser.id).then(history.go(0))
  }

    addCritter({
    name: Critter.name,
    breed: Critter.breed,
    sex: Critter.sex,
    imageLocation: Critter.imageLocation,
    notes: Critter.notes,
    userProfileId: 1
    })
    .then(refreshPage)
    .then(history.push(`/Critter/${currentUser.id}`))
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
                <Input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name" value={Critter.name} />
              </FormGroup>
              <FormGroup>
                <Label for="breed">Breed: </Label>
                <Input type="textarea" id="breed" onChange={handleControlledInputChange} required autoFocus className="form-control"
                placeholder="Enter your Critter Breed here" value={Critter.breed}  />
              </FormGroup>
              <FormGroup>
                <Label for="sex">Sex: </Label>
                <Input type="textarea" id="sex" onChange={handleControlledInputChange} required autoFocus className="form-control"
                placeholder="Enter your Critter sex here" value={Critter.sex}  />
              </FormGroup>
              <FormGroup>
                <Label for="image">Image: </Label>
                <Input type="textarea" id="imageLocation" onChange={handleControlledInputChange} required autoFocus className="form-control"
                placeholder="Enter your Critter image here" value={Critter.imageLocation}  />
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
