/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  CardColumns,

} from "reactstrap";
import { getDados } from "../../Api/api.js";
import CardItem from '../../Components/Cards/'
import "./index.css";
import BarraTopo from "../../Components/BarraTopo/";
import { useParams } from "react-router-dom";

const Provedores = () => {
  const [planos, setPlanos] = useState([]);
  const [isOpen, setIsOpen] = useState("");
  const {estado}  = useParams()
  useEffect(() => {
    getDados(`/plans${estado?'?state='+estado:'/'}`, (plano) => {
      setPlanos(plano);
    });
  }, []);

  const handleToggle = (id) => {
    if (isOpen === id) {
      setIsOpen("");
    } else {
      setIsOpen(id);
    }
  };



  return (
    <>
      <BarraTopo />
      <CardColumns id="listagem">
        {planos.map((planos) => (
          <CardItem key={planos.id} planos={planos} isOpen={isOpen} toggle={(id)=>{handleToggle(id)}}/>
        ))}
      </CardColumns>
    </>
  );
};

export default Provedores;
