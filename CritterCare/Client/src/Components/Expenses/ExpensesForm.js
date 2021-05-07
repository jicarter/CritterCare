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
import { ExpensesContext } from '../../Providers/ExpensesProvider';
import { useHistory, useParams } from 'react-router-dom';

export const ExpensesForm = () => {
  const { addExpenses, getExpensessByUserProfileId, userProfileId } = useContext(ExpensesContext)
  const history = useHistory();
  const { id } = useParams();
  const [Expenses, setExpenses] = useState({
    name: "",
    price: "",
    store: "",
    receipt: ""
  })

  const handleControlledInputChange = (event) => {
    const newExpenses = { ...Expenses }

    newExpenses[event.target.id] = event.target.value
    setExpenses(newExpenses)
  }

  const saveExpenses = ()  => {

    addExpenses({
    name: Expenses.name,
    price: Expenses.price,
    store: Expenses.store,
    receipt: Expenses.receipt,
    userProfileId: 1
    })
    .then(setExpenses)
    .then(history.push(`/Expenses/${id}`))
  }

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardHeader>
            <h2 className="ExpensesForm__title">Add Expenses</h2>
          </CardHeader>
          <CardBody>
            <Form className="ExpensesForm">
              <FormGroup>
                <Label for="name">Name: </Label>
                <Input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name" value={Expenses.name} />
              </FormGroup>
              <FormGroup>
                <Label for="price">price: </Label>
                <Input type="textarea" id="price" onChange={handleControlledInputChange} required autoFocus className="form-control"
                placeholder="Enter your Expenses price here" value={Expenses.price} rows="10" />
              </FormGroup>
              <FormGroup>
                <Label for="store">Store: </Label>
                <Input type="textarea" id="store" onChange={handleControlledInputChange} required autoFocus className="form-control"
                placeholder="Enter your Expenses sex here" value={Expenses.store} rows="10" />
              </FormGroup>
              <FormGroup>
                <Label for="receipt">Receipt: </Label>
                <Input type="textarea" id="receipt" onChange={handleControlledInputChange} required autoFocus className="form-control"
                placeholder="Enter your Expenses image here" value={Expenses.receipt} rows="10" />
              </FormGroup>
            </Form>
            <Button color="info" onClick={saveExpenses}>Save Expenses</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ExpensesForm
