import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Foundation from "./components/Pages/Fundation/Foundation";
import LoadPage from "./components/Pages/LoadPage/LoadPage";
import { createBrowserHistory } from "history";

import "./styles.scss";

import Header from "./components/Header/Header";
import Main from "./components/Pages/Main/Main";
import Footer from "./components/Footer/Footer";
import AuthForm from "./components/Pages/AuthForm/index";

const App = () => {
  const isAuth = useSelector((state) => state.auth.isAuthentication);
  const userData = useSelector((state) => state.auth.user);

  const history = createBrowserHistory();
  return (
    <div className="App">
      <Router history={history}>
        <Header isUserAuth={isAuth} userData={userData} />
        {/* https://replit.com/@stsiushkevich/custom-app-v34 */}
        <Main isUserAuth={isAuth}>
          <Switch>
            <Route exact path="/">
              <AuthForm />
            </Route>

            <Route path="/home" component={() => <h2>Home </h2>} />
            <Route path="/calcLoads">
              <LoadPage />
            </Route>
            <Route path="/calcFound" render={() => <Foundation />} />
            <Route path="/calcBrick" render={() => <p>Calc brick</p>} />
            <Route path="/settings" render={() => <p>Settings</p>} />
            <Route path="/about" render={() => <p>About</p>} />
          </Switch>
        </Main>
      </Router>

      <Footer />
    </div>
  );
};
export default App;
