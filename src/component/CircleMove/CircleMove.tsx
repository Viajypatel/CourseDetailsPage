import React from 'react'
import { useState } from 'react';
const CircleMove = () => {
   const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
   const [mouseEffect, setMouseEffect] = useState({scale: 1, opacity: 1});

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>){
          setMousePosition({x:event.clientX,y:event.clientY});
          setMouseEffect({scale: 1.2, opacity: 0.7}); // Example values, can be adjusted
          console.log(event);
    }

  return (
    <div onMouseMove={handleMouseMove} className='min-h-screen bg-gray-300'>
      djjd
      <p>posetion of x and y:{mousePosition.x}:{mousePosition.y}</p>
      <div 
        className='duration-300 ease-linear bg-blue-500 h-6 w-6 rounded-full absolute top-0 left-0' 
        style={{
          top:mousePosition.y,
          left:mousePosition.x, 
          transform: `scale(${mouseEffect.scale})`,
          opacity: mouseEffect.opacity,
          transition: 'top 0.1s ease-out, left 0.1s ease-out, transform 0.2s ease-in-out, opacity 0.2s ease-in-out'
        }}
      ></div>
    </div>
  )
}

export default CircleMove
