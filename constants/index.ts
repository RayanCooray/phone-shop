export const FIELD_NAMES = {
  fullName: "Full Name",
  email: "Email Address",
  password: "Password",
  confirmPassword: "Confirm Password",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  password: "password",
  confirmPassword: "password",
};

export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "All Users",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/admin/products",
    text: "All Products",
  },
  {
    img: "/icons/admin/bookmark.svg",
    route: "/admin/orders",
    text: "All Orders",
  },
];