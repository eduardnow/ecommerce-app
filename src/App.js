import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Cart from "./components/Cart/Cart";
import ProductList from "./components/Product/ProductList";
import Nav from "./components/Nav";

class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/products" component={ProductList} />
        <Route path="/cart" component={Cart} />
      </>
    );
  }
}

export default App;
