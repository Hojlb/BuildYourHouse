import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import Foundation from "./components/Pages/Fundation/Foundation";
import LoadTable from "./components/Pages/LoadTable/LoadTable";
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
      <Header isUserAuth={isAuth} userData={userData} />
      <Router history={history}>
        {/* https://replit.com/@stsiushkevich/custom-app-v34 */}
        <Main>
          <Switch>
            <Route exact path="/" component={() => <AuthForm />} />
            <Route path="/home" component={() => <h2>Home </h2>} />
            <Route path="/calcLoads" render={() => <LoadTable />} />
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

/*

import PunchingIndex from './punching/punchingIndex';
import LongRebarIndex from './longRebar/longRebarIndex';

function Home() {
  return <h2>Домашняя страница</h2>;
}

function WebProjects() {
  return <h2>Мои проекты...</h2>;
}

function LongRebar() {
  return <LongRebarIndex />;
}

function ShearRebar() {
  return <h2>Поперечное армирование</h2>;
}

function Punching() {
  return <PunchingIndex />;
}

function ReinfConc() {
  return (
    <div>
      <nav>
        <NavLink exact to="/reinforcementConcrete/longRebar"> Продольное армирование </NavLink>
        <NavLink to="/reinforcementConcrete/shearRebar"> Поперечное армирование </NavLink>
        <NavLink to="/reinforcementConcrete/punching"> Продавливание </NavLink>
      </nav>
      <Switch>
        <Route exact path='/reinforcementConcrete/longRebar' render={() => <LongRebar />} />
        <Route path='/reinforcementConcrete/shearRebar' render={() => <ShearRebar />} />
        <Route path='/reinforcementConcrete/punching' render={() => <Punching/>} />
      </Switch>
    </div>
   )
}

function About() {
  return <h2>Max Polonsky</h2>;
}

function Nav() {
  return (
    <nav>
      <NavLink exact to="/"> Домой </NavLink>
      <NavLink to="/myWebProjects"> My web projects </NavLink>
      <NavLink to="/reinforcementConcrete"> Расчет железобетонных конструкций </NavLink>
      <NavLink to="/about"> About </NavLink>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" render={ () => <Home/> } />
          <Route path="/myWebProjects" render={() => <WebProjects/>} />
          <Route path="/reinforcementConcrete" render={() => <ReinfConc/>} />
          <Route path="/about" render={() => <About/>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

*/
