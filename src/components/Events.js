import React from 'react'
import {Container,Row,Col} from "reactstrap"
import {FaLinkedin,FaGithub} from "react-icons/fa"
import man from "../man.jpg"
function Events() {
    return (
        <div className="eventbg">
        <Container style={{paddingTop:"20px"}} >
        <h1 style={{color:"#43b17b"}}>
            ASK ME ANYTHING
        </h1>
        <Row>
          <Col md={6}>
          <p style={{fontSize:"25px",fontWeight:"bold"}}>Upcoming AMA with  NAME</p>
            <p style={{fontSize:"18px"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            <p style={{fontSize:"18px",fontWeight:"bold"}}><a href="" style={{color:"#000"}}>Submit your Questions before</a></p>
            <p style={{background:"#f4b400",width:"250px",height:"25px",fontWeight:"bold"}}>14th June,Sunday at 4pm</p>
            </p>
            <p>Want to know more about Our guest Check out the links below</p>
            <FaGithub style={{ fontSize:"30px"}}/> &nbsp;
            <FaLinkedin  style={{ fontSize:"30px"}}/>
            
            </Col>
            <Col md={6}>
            <img src={man} className="img-fluid"/>
            </Col>
        </Row>
        </Container>
        </div>
    
    )
}

export default Events
