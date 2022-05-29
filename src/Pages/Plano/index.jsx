/* eslint-disable */
import React, { useState, useEffect } from "react";
import BarraTopo from "../../Components/BarraTopo/";
import {
  CardBody,
  Card,
  CardHeader,
  Badge,
  CardColumns
} from "reactstrap";
import { IconContext } from "react-icons";
import { HiOutlineDownload, HiOutlineUpload } from "react-icons/hi";
import { FaSatelliteDish, FaNetworkWired } from "react-icons/fa";
import { IoRadioOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import {getDados} from  '../../Api/api.js'
import ItemLista from '../../Components/ItemLista/'
import './index.css'

const Plano = () => {
  const {planoid} = useParams();
  const [plano, setPlano] = useState({})
  const [instaladores, setInstaladores] = useState([])
  const [precoMes, setPrecoMes] = useState(0)
  const getTypeIcon = (iconName) => {
    if (iconName === "sat") return <FaSatelliteDish className="icon" />;
    if (iconName === "wire") return <FaNetworkWired className="icon" />;
    if (iconName === "cable") return <FaNetworkWired className="icon" />;
    if (iconName === "radio") return <IoRadioOutline className="icon" />;
  };

  useEffect(() => {
    getDados(`/plans/${planoid}`, (plano) => {
      setPlano(plano);
      setPrecoMes(plano.price_per_month.toFixed(2))
    });
    getDados(`/installers?plan=${planoid}`, setInstaladores);
  }, []);
  return (
    <div>
      <BarraTopo />
      <Card key={plano.id}>
        <CardHeader>
          <IconContext.Provider value={{ size: "1.2em" }}>
            {getTypeIcon(plano.type_of_internet)}
          </IconContext.Provider>
          <h4 style={{ display: "inline" }}>
            {plano.isp}

            <span className="preco">
              R${precoMes}
            </span>
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
          <CardBody>
            <p className="descricao">{plano.description}</p>
            <p className="capacidade">
              {plano.data_capacity
                ? plano.data_capacity + " GB mensais"
                : "Capacidade Ilimitada"}
            </p>
          </CardBody>
      </Card>
      <CardColumns id='instaladores'>
        {instaladores.map((instalador) => (
          <ItemLista key={instalador.id} instalador={instalador} planoid={plano.id}/>
        ))}
      </CardColumns>
    </div>
  );
};

export default Plano;
