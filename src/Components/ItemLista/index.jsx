import React, { useContext, useEffect, useState } from "react";
import { CardBody, Card, CardHeader, Button } from "reactstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./index.css";
import { PositionContext } from "../../App";
import { Link } from "react-router-dom";

function distance(lat1, lon1, lat2, lon2) {
  var radius = 6371;
  var difLat = deg2rad(lat2-lat1);
  var difLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(difLat/2) * Math.sin(difLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(difLon/2) * Math.sin(difLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var dist = radius * c;
  return dist;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function ItemLista(props) {
  const pos = useContext(PositionContext).pos;
  const instalador = props.instalador;
  const planoid = props.planoid
  const [price, setPrice] = useState(0);

  function getRating(rating) {
    const stars = [];
    for (let i = 0; i < 10; i++) {
      stars.push(i < rating ? <AiFillStar color="#FEBE12"/> : <AiOutlineStar color="lightgray" />);
    }
    return stars.map((component, index) => (
      <React.Fragment key={index}>{component}</React.Fragment>
    ));
  }

  useEffect(() => {
    setPrice((distance(instalador.lat, instalador.lng, pos.lat, pos.lon)*instalador.price_per_km).toFixed(2));
  });

  return (
    <Card key={instalador.id}>
      <CardHeader className="header-instalador">
        <h4 style={{ display: "inline" }}>{instalador.name}</h4>
        <Link to={`/chat/${instalador.id}&${planoid}`}>
          <Button color="info" outline className="solicitar">
            Solicitar instalação
          </Button>
        </Link>
      </CardHeader>
      <CardBody className="body-instalador">
        <div className="nota">{getRating(instalador.rating)}</div>
        <div className="preco-instalador">R${price}</div>
      </CardBody>
    </Card>
  );
}

export default ItemLista;
