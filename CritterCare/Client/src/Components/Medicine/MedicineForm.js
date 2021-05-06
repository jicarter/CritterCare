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
import { MedicineContext } from '../../providers/MedicineProvider';
import { useHistory, useParams } from 'react-router-dom';

export const MedicineForm = () => {
  const { addMedicine, getMedicinesByUserProfileId, userProfileId } = useContext(MedicineContext)
  const history = useHistory();

  const [Medicine, setMedicine] = useState({
    subject: "",
    content: ""
  })

  const handleControlledInputChange = (event) => {
    const newMedicine = { ...Medicine }

    newMedicine[event.target.id] = event.target.value
    setMedicine(newMedicine)
  }

  const saveMedicine = ()  => {

    addMedicine({
    subject: Medicine.type,
    content: Medicine.details,
    userProfileId: 1
    })
    .then(setMedicine)
    .then(history.push(`/Medicines/${postId}`))
  }

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardHeader>
            <h2 className="MedicineForm__title">Add Medicine</h2>
          </CardHeader>
          <CardBody>
            <Form className="MedicineForm">
              <FormGroup>
                <Label for="type">Type: </Label>
                <Input type="text" id="type" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Type" value={Medicine.type} />
              </FormGroup>
              <FormGroup>
                <Label for="content">Details: </Label>
                <Input type="textarea" id="Details" onChange={handleControlledInputChange} required autoFocus className="form-control"
                placeholder="Enter your Medicine Details here" value={Medicine.content} rows="10" />
              </FormGroup>
            </Form>
            <Button color="info" onClick={saveMedicine}>Save Medicine</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default MedicineForm
