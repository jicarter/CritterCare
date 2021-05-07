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
                    <p>{Expenses.Name}</p>
                    <p>{Expenses.Price}</p>
                    <p>{Expenses.Store}</p>
                    <p>{Expenses.Receipt}</p>
                </CardBody>
                <Button onClick={editExpenses}>Edit</Button>
            </Card>
        )
    } else {
        return (

            <Card className="m-4">
                <CardBody>
                    <p>{Expenses.Name}</p>
                    <p>{Expenses.Price}</p>
                    <p>{Expenses.Store}</p>
                    <p>{Expenses.Receipt}</p>
                </CardBody>
            </Card>
        )

    }
}

export default Expenses;
