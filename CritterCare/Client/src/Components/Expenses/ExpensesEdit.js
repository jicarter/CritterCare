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
import { useHistory, useParams } from "react-router-dom";


export const ExpensesEdit = () => {

    const { updateExpenses, getExpensesById, getUserExpenses } = useContext(ExpensesContext)

    const { id } = useParams();
    const [Expenses, setExpenses] = useState({});
    const history = useHistory();
    
    // form field states
    const [name, setName] = useState("");
    const [store, setStore] = useState("");
    const [price, setPrice] = useState("");
    const [receipt, setReceipt] = useState("");
   
    const userProfile = sessionStorage.getItem("userProfile");




    useEffect(() => {
        getExpensesById(id).then(setExpenses)
            .then(getUserExpenses)
    }, []);

    // Once the Expenses has been set in state, update the form with previous post info
    useEffect(() => {

        setName(Expenses.name)
        setStore(Expenses.store)
        setPrice(Expenses.Price)
        setReceipt(Expenses.receipt)
    }, [Expenses])


    const submit = (e) => {

        const updatedExpenses = {
            ...Expenses
        };
        
        updatedExpenses.name = name
        updatedExpenses.store = store
        updatedExpenses.price = price
        updatedExpenses.receipt = receipt

        updateExpenses(updatedExpenses).then((c) => {
            // Navigate the user back to the home route
            
            history.push(`/Expensess/${Expenses.ExpensesId}`);
            
        });
    }
    const cancel = () => {
        history.push(`/Expensess/${id}}`);
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
