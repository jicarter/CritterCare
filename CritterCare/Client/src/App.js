import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./Providers/UserProfileProvider";
import Header from "./Components/Header";
import ApplicationViews from "./Components/ApplicationViews";
import { MedicineProvider } from './Providers/MedicineProvider';
import { FoodProvider } from './Providers/FoodProvider';
import { CritterProvider } from './Providers/CritterProvider';
import { ExpensesProvider } from './Providers/ExpensesProvider';
import { CategoryProvider } from './Providers/CategoryProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <MedicineProvider>
          <FoodProvider>
            <CritterProvider>
              <ExpensesProvider>
              <CategoryProvider>
                <Header />
                <ApplicationViews />
                </CategoryProvider>
              </ExpensesProvider>
            </CritterProvider>
          </FoodProvider>
        </MedicineProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;