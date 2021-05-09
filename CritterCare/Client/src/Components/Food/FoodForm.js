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
import { FoodContext } from '../../Providers/FoodProvider';
import { useHistory, useParams } from 'react-router-dom';

export const FoodForm = () => {
  const { addFood, getFoodsByUserProfileId, userProfileId } = useContext(FoodContext)
  const history = useHistory();
  const { id } = useParams();
  const [Food, setFood] = useState({
    type: "",
    details: ""
  })

  const handleControlledInputChange = (event) => {
    const newFood = { ...Food }

    newFood[event.target.id] = event.target.value
    setFood(newFood)
  }

  const saveFood = ()  => {

    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile)
    
    addFood({
    type: Food.type,
    details: Food.details,
    userProfileId: 1
    })
    .then(setFood)
    .then(history.push(`/Food/${userProfile.id}`))
  }

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardHeader>
            <h2 className="FoodForm__title">Add Food</h2>
          </CardHeader>
          <CardBody>
            <Form className="FoodForm">
              <FormGroup>
                <Label for="type">Type: </Label>
                <Input type="text" id="type" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Type" value={Food.type} />
              </FormGroup>
              <FormGroup>
                <Label for="details">Details: </Label>
                <Input type="textarea" id="Details" onChange={handleControlledInputChange} required autoFocus className="form-control"
                placeholder="Enter your Food Details here" value={Food.details} rows="10" />
              </FormGroup>
            </Form>
            <Button color="info" onClick={saveFood}>Save Food</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default FoodForm
