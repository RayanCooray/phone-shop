# Prime Mobiles

## Overview
Prime Mobiles is an e-commerce platform for purchasing mobile phones online. The website is built with modern web technologies, ensuring a smooth user experience with authentication, secure transactions, and image optimization.

## Technologies Used
- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Express.js
- **Authentication:** NextAuth.js, JWT
- **Image Optimization:** ImageKit

## Features
- User Authentication (Login/Register)
- Browse and Search for Mobile Phones
- Secure Checkout and Payment Integration
- Admin Dashboard for Product Management
- Mobile-Optimized and Responsive UI
- Fast Image Loading with ImageKit

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (>=16.x)
- npm or yarn

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/RayanCooray/phone-shop
   cd prime-mobiles
   ```
2. **Install dependencies:**
   ```sh
   npm install  # or yarn install
   ```
3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and configure the following:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   JWT_SECRET=your_jwt_secret
   BACKEND_URL=http://localhost:5000
   ```
4. **Run the development server:**
   ```sh
   npm run dev  # or yarn dev
   ```
   The frontend will be available at `http://localhost:3000`.

5. **Start the backend server:**
   ```sh
   cd backend
   npm install
   npm start
   ```
   The backend will run at `http://localhost:5000`.

## Folder Structure
```
prime-mobiles/
├── app/               # Application logic and pages
├── component/         # Reusable UI components
├── constants/         # Global constants and configuration
├── lib/               # Utility functions and helpers
├── public/            # Static assets & demo
├── .env.local         # Environment variables
├── package.json       # Dependencies and scripts
├── README.md          # Documentation
```

## Demo Images
![IMG-20240711-WA0013](https://github.com/RayanCooray/phone-shop/blob/master/public/application/Screenshot%20(4251).png)
![IMG-20240711-WA0012](https://github.com/RayanCooray/phone-shop/blob/master/public/application/Screenshot%20(4253).png)
![IMG-20240711-WA0011](https://github.com/RayanCooray/phone-shop/blob/master/public/application/Screenshot%20(4254).png)
![IMG-20240711-WA0010](https://github.com/RayanCooray/phone-shop/blob/master/public/application/Screenshot%20(4255).png)
![IMG-20240711-WA0009](https://github.com/RayanCooray/phone-shop/blob/master/public/application/Screenshot%20(4256).png)
![IMG-20240711-WA0008](https://github.com/RayanCooray/phone-shop/blob/master/public/application/Screenshot%20(4258).png)
![IMG-20240711-WA0007](https://github.com/RayanCooray/phone-shop/blob/master/public/application/Screenshot%20(4259).png)


## Deployment
To deploy the project:
- Use Vercel for frontend deployment.
- Use a cloud service (e.g., Render, Railway) for the backend.

## License
This project is licensed under the MIT License.

## Contributors
- **Dilud Ryan** - [GitHub Profile](https://github.com/RayanCooray)

## Contact
For issues or contributions, open a GitHub issue or contact me at `raycooray32@gmail.com`.

