import React, { useContext, useEffect } from "react";
import { ExpensesContext } from "../../Providers/ExpensesProvider";
import Expenses from  "./Expenses";
import { Button } from "reactstrap";
import { useHistory, useParams, Link } from 'react-router-dom';

export const ExpensesList = () => {
  const { Expenses, setExpenses, getUserExpenses} = useContext(ExpensesContext);
  const history = useHistory();
  const { id } = useParams();

  
  useEffect(() => {
    getUserExpenses(id)
    
    .then(console.log(Expenses))
  }, []);


  return (
    <div className="container">
      <Link to={`/`}>Home</Link>
      <div className="row justify-content-center">
        <div className="cards-column">
          {Expenses.map((Expenses) => (
            <Expenses key={Expenses.id} Expenses={Expenses} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExpensesList;
