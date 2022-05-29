/* eslint-disable */
import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarText,
  Collapse,
  NavItem,
  NavLink,
  Nav,
  NavbarToggler,
} from "reactstrap";
import { BsPersonCircle } from "react-icons/bs";
import { IconContext } from "react-icons";
import { GoThreeBars } from "react-icons/go";
import "./index.css";

export default class BarraTopo extends Component {
  constructor(props) {
    super(props);
    this.navItems = this.props.children;
    this.togglerDisplay = this.props.expandbar?(this.props.children ? true : false):false
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: this.props.expandbar?false:true,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar className="barra-topo color-primary" expand={this.props.expandbar?'md':false}>
          <NavbarBrand href="/" id="logo">
            <span id="logoFirst">Pro</span>
            <span id="logoSecond">vider</span>
          </NavbarBrand>
          <IconContext.Provider value={{ size: "3em", color: "white" }}>
            <BsPersonCircle className="profile" />
          </IconContext.Provider>
          <NavbarToggler
            onClick={this.toggle}
            style={!this.togglerDisplay?{display:'none'}:{}}
          >
            <IconContext.Provider value={{ size: "2em", color: "white" }}>
              <GoThreeBars />
            </IconContext.Provider>
          </NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {React.Children.map(this.props.children, (navItem) => navItem)}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
/* 
{React.Children.map(navitem =>{
  console.log(navitem);
  return <NavItem>navitem</NavItem>;
})} */
