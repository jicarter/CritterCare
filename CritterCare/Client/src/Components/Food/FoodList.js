import React, { useContext, useEffect } from "react";
import { FoodContext } from "../../Providers/FoodProvider";
import Food from  "./Food";
import { Button } from "reactstrap";
import { useHistory, useParams, Link } from 'react-router-dom';

export const FoodList = () => {
  const { Foods, setFood, getUserFood} = useContext(FoodContext);
  const history = useHistory();
  const { id } = useParams();

  
  useEffect(() => {
    getUserFood(id)
    
    .then(console.log(Foods))
  }, []);


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {Foods.map((food) => (
            <Food key={food.id} Food={food} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FoodList;
