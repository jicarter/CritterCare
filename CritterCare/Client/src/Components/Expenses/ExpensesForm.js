import React, { useContext, useEffect, useState } from "react"
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
  CardHeader,
} from "reactstrap";
import { ExpensesContext } from '../../Providers/ExpensesProvider';
import { CategoryContext } from '../../Providers/CategoryProvider';
import { useHistory, useParams } from 'react-router-dom';

export const ExpensesForm = () => {
  const { addExpenses, getExpensessByUserProfileId, userProfileId } = useContext(ExpensesContext);
  const { getAllCategories } = useContext(CategoryContext);
  const history = useHistory();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const userProfile = sessionStorage.getItem("userProfile");
    var currentUser = JSON.parse(userProfile)

  useEffect(() => {
    getAllCategories().then(setCategories)
  }, [])

  const [Expenses, setExpenses] = useState({
    name: "",
    price: "",
    store: "",
    receipt: "",
    categoryId: ""
  })
console.log(Expenses);

  const handleControlledInputChange = (event) => {
    const newExpenses = { ...Expenses }

    newExpenses[event.target.id] = event.target.value
    setExpenses(newExpenses)
  }

  const saveExpenses = () => {

    addExpenses({
      name: Expenses.name,
      price: parseInt(Expenses.price),
      store: Expenses.store,
      receipt: Expenses.receipt,
      categoryId: parseInt(Expenses.categoryId),
      userProfileId: 1
    })
      .then(setExpenses)
      .then(history.push(`/Expenses/${currentUser.id}`))
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
                  placeholder="Enter your Expenses price here" value={Expenses.price} />
              </FormGroup>
              <FormGroup>
                <Label for="store">Store: </Label>
                <Input type="textarea" id="store" onChange={handleControlledInputChange} required autoFocus className="form-control"
                  placeholder="Enter where you spent your money here" value={Expenses.store} rows="10" />
              </FormGroup>
              <FormGroup>
                <Label for="receipt">Receipt: </Label>
                <Input type="textarea" id="receipt" onChange={handleControlledInputChange} required autoFocus className="form-control"
                  placeholder="Enter your Expenses Receipt location here" value={Expenses.receipt}  />
              </FormGroup>
              <FormGroup>
                <Label for="categoryId">Category: </Label>
                <select
                  value={Expenses.categoryId}
                  id="categoryId"
                  className="form-control"
                  onChange={handleControlledInputChange}
                >
                  <option value="0">
                    Select a category
                                    </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
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
