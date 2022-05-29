/* eslint-disable */
import React, { useState, useLayoutEffect, useEffect } from "react";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./index.css";

const TAMANHO_MAX_P_BOTAO = 992;

function getWindowWidth() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return width;
}

function BotaoDeBusca(props) {
  const width = getWindowWidth();
  const [entrada, setentrada] = useState(props);
  const [estado, setestado] = useState("");
  function definirEntrada(event) {
    setentrada(event.target.value);
  }
  useEffect(() => {
    if (props.location == undefined) return;
    setentrada(props.location);
    recuperarEstado(props.location);
  }, [props]);

  function recuperarEstado(endr) {
    let code = endr.match(new RegExp("[A-Z][A-Z]"));
    setestado(code ? code[0] : "");
  }
  return (
    <div className="rodape">
      <Input
        className="endereco"
        bsSize="lg"
        value={entrada}
        onChange={definirEntrada}
      ></Input>
      <Link to={"/provedores/" + estado}>
        <Button
          color="dark"
          className="pesquisarEndereco"
          
        >
          {width > TAMANHO_MAX_P_BOTAO ? (
            "Pesquisar provedores"
          ) : (
            <AiOutlineArrowRight style={{ fontSize: "2em", minWidth: 50 }} />
          )}
        </Button>
      </Link>
    </div>
  );
}

export default BotaoDeBusca;
