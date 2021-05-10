import React, { useContext } from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";
import { FoodContext } from "../../Providers/FoodProvider";

const Food = ({ Food }) => {
  const history = useHistory();
  const userProfile = sessionStorage.getItem("userProfile");
  var currentUser = JSON.parse(userProfile);

  const { deleteFood, getUserFood } = useContext(FoodContext);
  
  const handleDelete = () => {
        
    if (window.confirm(`Are you sure you want to delete this expense?`)) {
        deleteFood(Food.id).then(getUserFood);
        history.push(`/Food/${currentUser.id}`);
    }
};

  const editFood = () => {
    
    history.push(`/Food/edit/${Food.id}`);
  };

  if (currentUser.id === Food.userProfileId) {

    return (
      <Card className="m-4">
        <CardBody>
          <p>{Food.type}</p>
          <p>{Food.details}</p>
        </CardBody>
        <Button onClick={editFood}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </Card>
    )
  } else {
    return (

      <Card className="m-4">
        <CardBody>
          <p>{Food.type}</p>
          <p>{Food.details}</p> 
        </CardBody>
      </Card>
    )

  }
}

export default Food;
