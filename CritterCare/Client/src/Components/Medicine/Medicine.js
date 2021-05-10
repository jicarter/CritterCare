import React, { useContext } from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";
import { MedicineContext } from "../../Providers/MedicineProvider";

const Medicine = ({ Medicine }) => {
  const history = useHistory();
  const userProfile = sessionStorage.getItem("userProfile");
  var currentUser = JSON.parse(userProfile);

  const { deleteMedicine, getUserMeds } = useContext(MedicineContext);
  
  const handleDelete = () => {
        
    if (window.confirm(`Are you sure you want to delete this expense?`)) {
        deleteMedicine(Medicine.id).then(getUserMeds);
        history.push(`/Medicine/${currentUser.id}`);
    }
};

  const editMedicine = () => {
    
    history.push(`/Medicine/edit/${Medicine.id}`);
  };

  if (currentUser.id === Medicine.userProfileId) {

    return (
      <Card className="m-4">
        <CardBody>
          <p>{Medicine.type}</p>
          <p>{Medicine.details}</p>
        </CardBody>
        <Button onClick={editMedicine}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </Card>
    )
  } else {
    return (

      <Card className="m-4">
        <CardBody>
          <p>{Medicine.type}</p>
          <p>{Medicine.details}</p>
        </CardBody>
      </Card>
    )

  }
}

export default Medicine;
