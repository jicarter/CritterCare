import React, { useContext, useEffect } from "react";
import { FoodContext } from "../../Providers/FoodProvider";
import Food from  "./Food";
import { Button } from "reactstrap";
import { useHistory, useParams, Link } from 'react-router-dom';

export const FoodList = () => {
  const { Food, setFood, getUserFood} = useContext(FoodContext);
  const history = useHistory();
  const { id } = useParams();

  
  useEffect(() => {
    getUserFood(id)
    
    .then(console.log(Food))
  }, []);


  return (
    <div className="container">
      <Link to={`/`}>Home</Link>
      <div className="row justify-content-center">
        <div className="cards-column">
          {Food.map((Food) => (
            <Food key={Food.id} Food={Food} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FoodList;
