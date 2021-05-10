import React, { useContext, useEffect } from "react";
import { ExpensesContext } from "../../Providers/ExpensesProvider";
import Expenses from  "./Expenses";
import { Button } from "reactstrap";
import { useHistory, useParams, Link } from 'react-router-dom';

export const ExpensesList = () => {
  const { expenses, setExpenses, getUserExpenses} = useContext(ExpensesContext);
  const history = useHistory();
  const { id } = useParams();

  
  useEffect(() => {
    getUserExpenses(id)
    
  }, [expenses]);


  return (
    
    <div className="container">
    <Button color="info" onClick={() => history.push(`/Expenses/create/`)}>Add Expenses</Button>
      <div className="row justify-content-center">
        <div className="cards-column">
          {expenses.map((ex) => (
            <Expenses key={ex.id} Expenses={ex} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExpensesList;
