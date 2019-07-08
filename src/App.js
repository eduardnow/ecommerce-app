import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Cart from "./components/Cart/Cart";
import ProductList from "./components/Product/ProductList";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Auth from "./components/Auth/Auth";
import Callback from "./components/Auth/Callback";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    return (
      <>
        <Header auth={this.auth} />
        <Container fluid="true">
          <Route
            path="/"
            exact
            render={props => <Home auth={this.auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => <Callback auth={this.auth} {...props} />}
          />
          <Route
            path="/profile"
            render={props =>
              this.auth.isAuthenticated() ? (
                <Profile auth={this.auth} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/products" component={ProductList} />
          <Route path="/cart" component={Cart} />
        </Container>
      </>
    );
  }
}

export default App;
