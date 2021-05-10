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
import { ExpensesContext } from '../../Providers/ExpensesProvider';
import { CategoryContext } from '../../Providers/CategoryProvider'
import { useHistory, useParams } from "react-router-dom";


export const ExpensesEdit = () => {

    const { updateExpenses, getExpensesById, getUserExpenses } = useContext(ExpensesContext)
    const { getAllCategories } = useContext(CategoryContext)

    const { id } = useParams();
    const [Expenses, setExpenses] = useState({});
    const history = useHistory();

    // form field states
    const [name, setName] = useState("");
    const [store, setStore] = useState("");
    const [price, setPrice] = useState("");
    const [receipt, setReceipt] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const userProfile = sessionStorage.getItem("userProfile");
    var currentUser = JSON.parse(userProfile)



    useEffect(() => {
        getExpensesById(id).then(setExpenses)
            .then(getAllCategories).then(setCategories)
    }, []);

    // Once the Expenses has been set in state, update the form with previous post info
    useEffect(() => {

        setName(Expenses.name)
        setStore(Expenses.store)
        setPrice(Expenses.Price)
        setReceipt(Expenses.receipt)
        setCategory(Expenses.categoryId)
    }, [Expenses])


    const submit = (e) => {

        const updatedExpenses = {
            ...Expenses
        };

        updatedExpenses.name = name
        updatedExpenses.store = store
        updatedExpenses.price = price
        updatedExpenses.receipt = receipt
        updatedExpenses.categoryId = category

        updateExpenses(updatedExpenses).then((c) => {
            // Navigate the user back to the home route

            history.push(`/Expenses/${currentUser.id}`);

        });
    }
    const cancel = () => {
        history.push(`/Expenses/${currentUser.id}}`);
    };

    if (Expenses === null) {
        return null
    }

    return (
        <div className="container pt-4">
            <div className="row justify-Details-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input id="name" onChange={(e) => setName(e.target.value)} value={name} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="store">Store</Label>
                                <Input type="textarea"
                                    id="store"
                                    onChange={(e) => setStore(e.target.value)}
                                    value={store}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">Price</Label>
                                <Input type="textarea"
                                    id="price"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="receipt">Receipt</Label>
                                <Input type="textarea"
                                    id="receipt"
                                    onChange={(e) => setReceipt(e.target.value)}
                                    value={receipt}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="categoryId">Category: </Label>
                                <select
                                    value={Expenses.categoryId}
                                    id="categoryId"
                                    className="form-control"
                                    onChange={(e) => setCategory(e.target.value)}
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

export default ExpensesEdit;
