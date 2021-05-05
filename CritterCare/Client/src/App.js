import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./Providers/UserProfileProvider";
import Header from "./Components/Header";
import ApplicationViews from "./Components/ApplicationViews";


function App() {
  return (
    <Router>
      <UserProfileProvider>
        <Header />
        <ApplicationViews />
      </UserProfileProvider>
    </Router>
  );
}

export default App;