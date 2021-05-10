import React, { useContext, useEffect } from "react";
import { CritterContext } from "../../Providers/CritterProvider";
import  Critter  from  "./Critter";
import { Button } from "reactstrap";
import { useHistory, useParams, Link } from 'react-router-dom';

export const CritterList = () => {
  const { Critters, setCritter, getUserCritter} = useContext(CritterContext);
  const history = useHistory();
  const { id } = useParams();

  
  useEffect(() => {
    getUserCritter(id).then(setCritter)
    
  }, []);


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {Critters.map((critter) => (
            <Critter key={critter.id} Critter={critter} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CritterList;
