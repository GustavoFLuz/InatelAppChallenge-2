import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavbarText, Input, InputGroup, Button } from "reactstrap";
import { GoTriangleRight } from "react-icons/go";
import { getDados } from "../../Api/api.js";
import BarraTopo from "../../Components/BarraTopo";
import "./index.css";

export default function Chat() {
  const instaladorId = useParams().instalador;
  const [instalador, setInstalador] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getDados(`/installers/${instaladorId}`, setInstalador);
  }, []);

  function send(msg) {
    setMessages([msg].concat(messages));
    setMessage('')
  }

  return (
    <div>
      <BarraTopo expandbar={false}>
        <NavbarText className="name-installer">{instalador.name}</NavbarText>
      </BarraTopo>
      <div className="message-area">
        {messages.map((msg, index) => {
          return (
            <div key={index} className="message">
              {msg}
            </div>
          );
        })}
      </div>
      <InputGroup className="chat-input-area">
        <Input
          className="chat-input"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
        <Button
          className="chat-input-send"
          color="primary"
          onClick={() => send(message)}
        >
          <GoTriangleRight />
        </Button>
      </InputGroup>
    </div>
  );
}
