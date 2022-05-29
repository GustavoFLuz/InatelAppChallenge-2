/* eslint-disable */
import React, { Component } from "react";
import "./index.css";
import { Alert, Button } from "reactstrap";
import BarraTopo from '../../Components/BarraTopo'
class NotFound extends Component {
  render() {
    return (
      <>
        <BarraTopo></BarraTopo>
        <div className="erro404">
          <Alert color="danger" className="alerta">
            <h3 className="alert-heading">Erro#404 Rota não encontrada</h3>
            <Button id="retornar" href="/">
              Retornar a tela inicial
            </Button>
          </Alert>
        </div>
      </>
    );
  }
}

export default NotFound;
