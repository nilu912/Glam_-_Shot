import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Outlet, Link } from "react-router-dom";
import "./navcss.css";


function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h2 variant="primary" onClick={handleShow} className="menu-Join-us-link">
Join Us
      </h2>
      {/* <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button> */}
      <Offcanvas show={show} onHide={handleClose} {...props} style={{'background-color': 'rgba(27, 31, 37, 0.75)',}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{'color':'aliceblue','text-align':'center',}}>Get Registered with Glam&Shot</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="reg-wrapper" >
            <div className="reg-your-self">
              <h1>Register Your Salon</h1>
              <p className='head-salon-info'>All-in-one salon scheduling software to grow and manage your salon business.</p>
              <p>Appointy’s salon booking software saves you time by automating appointment scheduling, salon management, marketing, payments, and much more!</p>
              <Link to='/s-login'><Button variant="dark" id='join-sbutton'>Join us</Button></Link>            
            </div>
            <div className="reg-your-self">
              <h1>Book Your Appointment</h1>
              <p className='head-salon-info'>Book your salon appointment esyly with us.</p>
              <p>Here you can book your salon appointment as you prefrence and choiceand saves your time.</p>
              <Link to='/c-login'><Button variant="dark" id='join-sbutton'>Book Now</Button></Link>            
            </div>  
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default function OffCanvas() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}