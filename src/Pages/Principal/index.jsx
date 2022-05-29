/* eslint-disable */
import React, { useEffect, useState } from "react";
import BarraTopo from "../../Components/BarraTopo/";
import Mapa from "../../Components/Mapa/";
import BotaoDeBusca from "../../Components/BotaoBusca";

import { NavLink } from "reactstrap";
const Principal = () => {
  const [location, setLocation] = useState("");
  return (
    <>
      <BarraTopo expandbar={true} >
        <NavLink href="/provedores">Provedores</NavLink>
      </BarraTopo>
      <Mapa setLocation={(local)=>setLocation(local)}/>
      <BotaoDeBusca location={location?location:' '}/>
    </>
  );
};
export default Principal;
//lat={coords.lat} lon={coords.lon} zoom={coords.zoom} />
