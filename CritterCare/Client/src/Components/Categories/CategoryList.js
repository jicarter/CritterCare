import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../../Providers/CategoryProvider";
import Category from  "./Category";
import { Button } from "reactstrap";
import { useHistory, useParams, Link } from 'react-router-dom';

export const CategoryList = () => {
  const { Category, setCategory, getUserCategory} = useContext(CategoryContext);
  const history = useHistory();
  const { id } = useParams();

  
  useEffect(() => {
    getUserCategory(id)
    
    .then(console.log(Category))
  }, []);


  return (
    <div className="container">
      <Link to={`/`}>Home</Link>
      <div className="row justify-content-center">
        <div className="cards-column">
          {Category.map((Category) => (
            <Category key={Category.id} Category={Category} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryList;
