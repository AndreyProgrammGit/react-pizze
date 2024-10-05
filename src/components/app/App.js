import "../../scss/app.scss";
import React, { useState } from "react";
import Header from "../header/Header";
import Home from "../../view/Home";
import Cart from "../../view/Cart";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [countItems, setItems] = useState(0);

  const getCountItems = (arg) => {
    setItems(arg);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <div className="wrapper">
          <Header countItems={countItems} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={<Cart getCountItems={getCountItems} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
