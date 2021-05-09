import React, { useContext, useEffect } from "react";
import { MedicineContext } from "../../Providers/MedicineProvider";
import Medicine from  "./Medicine";
import { Button } from "reactstrap";
import { useHistory, useParams, Link } from 'react-router-dom';

export const MedicineList = () => {
  const { Medicines, setMedicine, getUserMeds} = useContext(MedicineContext);
  const history = useHistory();
  const { id } = useParams();

  
  useEffect(() => {
    getUserMeds(id)
    
    .then(console.log(Medicine))
  }, []);


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {Medicines.map((medicine) => (
            <Medicine key={medicine.id} Medicine={medicine} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MedicineList;
