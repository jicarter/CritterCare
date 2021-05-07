import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./Providers/UserProfileProvider";
import Header from "./Components/Header";
import ApplicationViews from "./Components/ApplicationViews";
import { MedicineProvider } from './Providers/MedicineProvider';
import { FoodProvider } from './Providers/FoodProvider';
import { CritterProvider } from './Providers/CritterProvider';
import { ExpensesProvider } from './Providers/ExpensesProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <MedicineProvider>
          <FoodProvider>
            <CritterProvider>
              <ExpensesProvider>
                <Header />
                <ApplicationViews />
              </ExpensesProvider>
            </CritterProvider>
          </FoodProvider>
        </MedicineProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;