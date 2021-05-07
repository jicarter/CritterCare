import React, { useContext, useEffect } from "react";
import { CritterContext } from "../../Providers/CritterProvider";
import Critter from  "./Critter";
import { Button } from "reactstrap";
import { useHistory, useParams, Link } from 'react-router-dom';

export const CritterList = () => {
  const { Critter, setCritter, getUserCritter} = useContext(CritterContext);
  const history = useHistory();
  const { id } = useParams();

  
  useEffect(() => {
    getUserCritter(id)
    
    .then(console.log(Critter))
  }, []);


  return (
    <div className="container">
      <Link to={`/`}>Home</Link>
      <div className="row justify-content-center">
        <div className="cards-column">
          {Critter.map((Critter) => (
            <Critter key={Critter.id} Critter={Critter} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CritterList;
