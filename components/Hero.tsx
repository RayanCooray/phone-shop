import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';


const Hero = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center w-full min-h-screen text-white p-6">

      
      <div className="absolute inset-0 w-full h-full">
  <Image 
    src="/images/hero.jpg" 
    alt="Hero Background" 
    layout="fill" 
    objectFit="cover" 
    quality={100} 
    priority
    
  />
  <div className="absolute inset-0 bg-opacity-10"></div>
</div>


     
      <div className="relative z-10 text-center md:text-left max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Discover the Future of Mobile Technology
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Explore the latest smartphones and accessories with cutting-edge features.
        </p>
        <Link href='/products'>
        <Button className="mt-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#6366F1] transition shadow-lg rounded-lg">
          Shop Now
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
