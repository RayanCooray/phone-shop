import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  // const product = {
  //   title: "Premium Smartphone",
  //   price: 999.99,
  //   rating: 4.5,
  //   colors: ["#000000", "#ffffff", "#1e3a8a", "#dc2626"],
  //   images: ["/images/phone-front.jpg", "/images/phone-side.jpg"],
  //   howToUse: [
  //     "Turn on the phone by pressing the power button.",
  //     "Set up your account and preferences.",
  //     "Install your favorite apps from the app store.",
  //     "Enjoy seamless performance and connectivity.",
  //   ],
  //   fit: "Compatible with most wireless carriers worldwide.",
  // };

  const title = (await params).id
  
  return (
    <div>
      <h1 className='text-3xl text-white'>{title}</h1>
      
    </div>
  )
}

export default page
