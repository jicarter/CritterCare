import React, { useContext } from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";


const Category = ({ Category }) => {
  const history = useHistory();
  const userProfile = sessionStorage.getItem("userProfile");
  var currentUser = JSON.parse(userProfile);
  


  const editCategory = () => {
    
    history.push(`/Category/edit/${Category.id}`);
  };


    return (

      <Card className="m-4">
        <CardBody>
          <p>{Category.name}</p>
        </CardBody>
      </Card>
    )

  }


export default Category;
