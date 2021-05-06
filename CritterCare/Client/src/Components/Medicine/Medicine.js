import React, { useContext } from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";


const Medicine = ({ Medicine }) => {
  const history = useHistory();
  const userProfile = sessionStorage.getItem("userProfile");
  var currentUser = JSON.parse(userProfile);
  


  const editMedicine = () => {
    
    history.push(`/Medicine/edit/${Medicine.id}`);
  };

  if (currentUser.id === Medicine.userProfileId) {

    return (
      <Card className="m-4">
        <CardBody>
          <p>{Medicine.Type}</p>
          <p>{Medicine.Details}</p>
          <p>{Medicine.userProfile.displayName}</p>
        </CardBody>
        <Button onClick={editMedicine}>Edit</Button>
      </Card>
    )
  } else {
    return (

      <Card className="m-4">
        <CardBody>
          <p>{Medicine.Type}</p>
          <p>{Medicine.Details}</p>
          <p>{Medicine.userProfile.displayName}</p>
        </CardBody>
      </Card>
    )

  }
}

export default Medicine;
