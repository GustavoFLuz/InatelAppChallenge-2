import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import {
  Collapse,
  CardBody,
  Card,
  CardHeader,
  Badge,
  Button,
} from "reactstrap";
import { HiOutlineDownload, HiOutlineUpload } from "react-icons/hi";
import { FaSatelliteDish, FaNetworkWired } from "react-icons/fa";
import { IoRadioOutline } from "react-icons/io5";
import "./index.css";

const CardItem = (props) => {
  let meio;

  const plano = props.planos;
  const getTypeIcon = (iconName) => {
    if (iconName === "sat") {
      meio = "Satélite";
      return <FaSatelliteDish className="icon" />;
    }
    if (iconName === "wire") {
      meio = "Cabeamento";
      return <FaNetworkWired className="icon" />;
    }
    if (iconName === "cable") {
      meio = "Cabeamento";
      return <FaNetworkWired className="icon" />;
    }
    if (iconName === "radio") {
      meio = "Rádio";
      return <IoRadioOutline className="icon" />;
    }
  };
  return (
    <Card key={plano.id}>
      <CardHeader onClick={() => props.toggle(plano.id)}>
        <IconContext.Provider value={{ size: "1.2em" }}>
          {getTypeIcon(plano.type_of_internet)}
        </IconContext.Provider>
        <h4 style={{ display: "inline" }}>
          {plano.isp}

          <span className="preco">R${plano.price_per_month.toFixed(2)}</span>
        </h4>
      </CardHeader>
      <CardBody>
        <Badge pill className="download">
          <HiOutlineDownload />
          {plano.download_speed}mbps
        </Badge>

        <Badge pill className="upload">
          <HiOutlineUpload />
          {plano.upload_speed}mbps
        </Badge>
      </CardBody>
      <Collapse isOpen={props.isOpen === plano.id ? true : false}>
        <CardBody>
          <Link to={"/plano/" + plano.id}>
            <Button color="info" outline className="conferir">
              Conferir
            </Button>
          </Link>
          <p className="descricao">{plano.description}</p>
          <p className="via">Internet a {meio}</p>
          <p className="capacidade">
            {plano.data_capacity
              ? plano.data_capacity + " GB mensais"
              : "Capacidade Ilimitada"}
          </p>
        </CardBody>
      </Collapse>
    </Card>
  );
};
export default CardItem;
