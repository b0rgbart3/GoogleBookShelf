import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar"
import Footer from "./components/footer"

import { BookProvider } from "./utils/GlobalState";
import  Home  from './pages/home';
import Saved  from './pages/saved';
import NoMatch from "./pages/NoMatch";



function App() {
  return (
    <Router>
      <div>
        <BookProvider>
          <Navbar />


          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/saved" component={Saved} />
            <Route component={NoMatch} />
          </Switch>
          <Footer></Footer>
        </BookProvider>
      </div>
    </Router>
  );
}


export default App;
