// App.js
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import ProductDetail from "./products/detail/ProductDetail";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import { useAuth } from "./AuthContext";

function App() {
  const { authenticateUser } = useAuth();
  const [initialAuthenticationDone, setInitialAuthenticationDone] = useState(false);

  useEffect(() => {
    if (!initialAuthenticationDone) {
      // Realiza la autenticación inicial solo una vez
      async function authenticate() {
        try {
          await authenticateUser("client_credentials", "6ac1b658-ce4f-4ed4-c3e2-63e4eea652a4", "Grun2023");
          console.log("Usuario autenticado inicialmente");
          setInitialAuthenticationDone(true);
        } catch (error) {
          console.error('Error durante la autenticación inicial:', error);
        }
      }

      authenticate();
    }
  }, [authenticateUser, initialAuthenticationDone]);

  return (
    <Switch>
      <Route path="/products" exact>
        <ProductList />
      </Route>
      <Route path="/products/:slug">
        <ProductDetail />
      </Route>
      <Route path="/" exact>
        <Landing />
      </Route>
    </Switch>
  );
}

export default App;
