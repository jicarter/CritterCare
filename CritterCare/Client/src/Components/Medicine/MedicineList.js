import React, { useContext, useEffect } from "react";
import { MedicineContext } from "../../providers/MedicineProvider";
import Medicine from  "./Medicine";
import { Button } from "reactstrap";
import { useHistory, useParams, Link } from 'react-router-dom';

const MedicineList = () => {
  const { Medicine, setMedicine, getAllMedicinesOnCritter} = useContext(MedicineContext);
  const history = useHistory();
  const { id } = useParams();

  // The "id" here is the post id from critter details. The variable has to be called "id", so it's a bit confusing. NOT the Medicine id.
  useEffect(() => {
    getAllMedicinesOnCritter(parseInt(id))
    .then(setMedicine)
    .then(console.log(Medicine))
  }, []);


  return (
    <div className="container">
      <Link to={`/critters/${id}`}>Back to Critters</Link>
      <div className="row justify-content-center">
        <div className="cards-column">
          {Medicines.map((Medicine) => (
            <Medicine key={Medicine.id} Medicine={Medicine} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MedicineList;
