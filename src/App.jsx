/* eslint-disable */
import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Principal from "./Pages/Principal/";
import NotFound from "./Pages/NotFound/";
import Provedores from "./Pages/Provedores/";
import Plano from "./Pages/Plano/";
import Chat from './Pages/Chat/'
export const PositionContext = createContext();

function App() {
  const [pos, setPos] = useState({ lat: 0, lon: 0 });
  /* const [pos, setPos] = useState({
    lat: -22.233875702165278,
    lon: -45.70833314480842,
  }); */
  return (
    <div className="bg-dark">
      <BrowserRouter>
        <Container id="container">
          <PositionContext.Provider value={{ pos, setPos }}>
            <Routes>
              <Route exact path="/" element={<Principal />} />
              <Route exact path="/cliente" element={<Principal />} />
              <Route exact path="/provedores/" element={<Provedores />} />
              <Route
                exact
                path="/provedores/:estado"
                element={<Provedores />}
              />
              <Route exact path="/plano/:planoid" element={<Plano />} />
              <Route exact path="/chat/:instalador&:plano" element={<Chat/>}/>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PositionContext.Provider>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
