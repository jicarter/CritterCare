import React, { useContext } from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";


const Expenses = ({ Expenses }) => {
    const history = useHistory();
    const userProfile = sessionStorage.getItem("userProfile");
    var currentUser = JSON.parse(userProfile);



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
