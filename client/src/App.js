import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CalendarScreen from "./screens/CalendarScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import MattersScreen from "./screens/MattersScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import ContactsScreen from "./screens/ContactsScreen";
import DayScreen from "./screens/DayScreen";
import { MattersProvider } from "./context/MattersContext";
import { CalendarProvider } from "./context/CalendarContext";

function App() {
  return (
    <BrowserRouter>
      {/* <Route exact path="/">{loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}</Route> */}
      <Route path="/login" component={LoginScreen} exact />
      <Route path="/register" component={RegistrationScreen} />

      <MattersProvider>
        <CalendarProvider>
          <Route path="/matters" component={MattersScreen} exact />
          <Route path="/calendar" component={CalendarScreen} exact />
          <Route path="/day-screen" component={DayScreen} exact />

          <Route path="/categories" component={CategoriesScreen} exact />

          <Route path="/contacts" component={ContactsScreen} exact />
        </CalendarProvider>
      </MattersProvider>
    </BrowserRouter>
  );
}

export default App;
