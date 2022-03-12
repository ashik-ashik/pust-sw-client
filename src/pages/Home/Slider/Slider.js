import React from 'react';
import { Carousel } from 'react-bootstrap';

const Slider = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ibb.co/M2b0s59/banner.jpg
            "
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>Welcome To Our Varsity</h5>
            <h3>Education is the best key success in life</h3>
            {/* 
            

            */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ibb.co/r3P98ZF/banner-2.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h5>Welcome To Our Organization</h5>
            <h3>Education is the backbone of a nation</h3>
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ibb.co/Fx3jLLm/banner-1.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h5>Welcome to our website</h5>
            <h3>Education is the best key success in life</h3>
            {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Slider;