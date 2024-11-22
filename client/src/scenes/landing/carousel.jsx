import React from 'react';
// import Carousel from 'fade-carousel'


import React, { useState, useEffect } from 'react';

const Carousel = ({ divStyle, delay, mode, urls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slide at specified interval (delay)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length);
    }, delay);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [urls.length, delay]);

  const handleImageClick = (index) => {
    // Handle click on image (could be custom logic)
    console.log(`Image clicked at index: ${index}`);
  };

  return (
    <div style={divStyle} className={`carousel ${mode}`}>
      {urls.map((url, index) => (
        <div
          key={index}
          style={{ ...imageStyle, display: currentIndex === index ? 'block' : 'none' }} // Only show the current slide
        >
          <img
            src={url}
            alt={url}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderBottomLeftRadius: '80px', borderBottomRightRadius: '80px' }}
            onClick={() => handleImageClick(index)} // Handle image click
          />
        </div>
      ))}
    </div>
  );
};

const imageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};


function HeadCarousel() {

 const urls= ['https://images.pexels.com/photos/13803162/pexels-photo-13803162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'https://images.pexels.com/photos/2627246/pexels-photo-2627246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'];

 const divStyle = {
    height: "600px",
    width: "100%",
    backgroundColor: '#f2f2f2'
  }
  const imageStyle = {
    height: '100%',
    width: '100%',
    justifySelf: 'center',
    paddingBottom: '10px',
    borderBottom: '10px solid #006B7D',
    borderBottomLeftRadius: '80px',
    borderBottomRightRadius: '80px',
  }
  const hello = () => {
    console.log("hello");
  };

  return (
    <div className="App">
      <Carousel divStyle={divStyle} delay={6000} mode={"slide"} >
        {urls.map((url, index) => (
          <div key={index} style={imageStyle}>
            <img
              src={url}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderBottomLeftRadius: "80px", borderBottomRightRadius: "80px" }}
              alt={url}
              onClick={hello}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default HeadCarousel;