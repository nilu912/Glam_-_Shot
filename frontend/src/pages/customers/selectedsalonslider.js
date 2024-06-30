import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from "./ExampleCarouselImage";
// import s1 from "C:/Users/Chirag/Pictures/Screenshots/Screenshot (3).png";
import s1 from "C:/Users/Chirag/Documents/Project/Glam_And_Shot/glam_and_shot/frontend/static/images/s1objects & Vectors Shutterstock.png";
import s2 from "C:/Users/Chirag/Documents/Project/Glam_And_Shot/glam_and_shot/frontend/static/images/s2objects & Vectors Shutterstock.png";
import s3 from "C:/Users/Chirag/Documents/Project/Glam_And_Shot/glam_and_shot/frontend/static/images/s3objects & Vectors Shutterstock.png";
class SelectedSalonSlider extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item interval={1000}>
        <img src={s1} alt="First slide" style={{width:'100%', height:'300px'}}/>
          {/* <ExampleCarouselImage
            imageUrl="C:/Users/Chirag/Pictures/Screenshots/Screenshot (3).png"
            altText="First slide"
          /> */}
          <Carousel.Caption>
            <h3>Welcome to our salon</h3>
            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          {/* Replace ExampleCarouselImage with your class-based component */}
          {/* <ExampleCarouselImage text="Second slide" /> */}
          {/* Add your class-based component here */}
          <img src={s2} alt="Second slide" style={{width:'100%', height:'300px'}}/>
          <Carousel.Caption>
            <h3>Welcome to our salon</h3>
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {/* Replace ExampleCarouselImage with your class-based component */}
          {/* <ExampleCarouselImage text="Third slide" /> */}
          {/* Add your class-based component here */}
          <img src={s3} alt="Third slide" style={{width:'100%', height:'300px'}}/>
          <Carousel.Caption>
            <h3>Welcome to our salone</h3>
            {/* <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default SelectedSalonSlider;
