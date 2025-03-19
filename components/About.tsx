import React from "react";
import Policy from "./page/Policy";

const About = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gray-950 ">
      
      <div className="absolute inset-0  bg-cover bg-center opacity-25"> </div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

     
      <div className="relative z-10 text-center max-w-3xl px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-500 mb-4">
          PrimeMobiles
        </h1>
        <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
          Your one-stop destination for premium smartphones at unbeatable prices.
          Experience seamless shopping with quality assurance, best deals, and fast delivery.
        </p>

        
        
       
        <div className="mt-3 w-full px-4 sm:px-0">
          <Policy />
        </div>
      </div>
    </div>
  );
};

export default About;
