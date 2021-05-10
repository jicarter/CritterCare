import React, { useContext } from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";
import { ExpensesContext } from "../../Providers/ExpensesProvider";

const Expenses = ({ Expenses }) => {
    const history = useHistory();
    const userProfile = sessionStorage.getItem("userProfile");
    var currentUser = JSON.parse(userProfile);

    const { deleteExpenses, getUserExpenses } = useContext(ExpensesContext);

    const handleDelete = () => {
        
        if (window.confirm(`Are you sure you want to delete this expense?`)) {
            deleteExpenses(Expenses.id).then(getUserExpenses);
            history.push(`/Expenses/${currentUser.id}`);
        }
    };

    const editExpenses = () => {

        history.push(`/Expenses/edit/${Expenses.id}`);
    };

    if (currentUser.id === Expenses.userProfileId) {

        return (
            <Card className="m-4">
                <CardBody>
                    <p>Expense:{Expenses.name}</p>
                    <p>Price:{Expenses.price}</p>
                    <p>Store:{Expenses.store}</p>
                    <p>Receipt Image:{Expenses.receipt}</p>
                </CardBody>
                <CardFooter>
                    <p>Category:{Expenses.category.name}</p>
                </CardFooter>
                <Button onClick={editExpenses}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </Card>
        )
    } else {
        return (

            <Card className="m-4">
                <CardBody>
                    <p>{Expenses.name}</p>
                    <p>{Expenses.price}</p>
                    <p>{Expenses.store}</p>
                    <p>{Expenses.receipt}</p>
                    <p>{Expenses.category.name}</p>
                </CardBody>
            </Card>
        )

    }
}

export default Expenses;
