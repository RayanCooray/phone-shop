import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters."),
    email: z.string().email("Invalid email format."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});


export const phoneSchema = z.object({
  ProductName: z.string().min(1, "Product name is required"),
  ProductDescription: z.string().min(1, "Description is required"),
  ProductPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price"),
  ProductQuantity: z.string().regex(/^\d+$/, "Enter a valid quantity"),
  ProductCategory: z.string().min(1, "Category is required"),
  ProductBrand: z.string().min(1, "Brand is required"),
  ProductColor: z.string().min(1, "Color is required"),
  ProductSize: z.string().optional(),
  ProductRating: z.string().regex(/^[0-5](\.\d{1})?$/, "Enter a rating between 0-5").optional(),
  ProductImage: z.any().optional(),
});


export const orderSchema = z.object({
  user: z.string().min(1),
  products: z.array(
    z.object({
      product: z.string().min(1),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ).nonempty(),
  totalAmount: z.number().min(0),
  payment: z.object({
    cardLast4Digits: z.string().length(4).regex(/^\d{4}$/),
    paymentMethod: z.enum(["Credit Card", "PayPal", "Google Pay", "Apple Pay"]),
    status: z.enum(["Paid", "Failed", "Pending"]),
  }),
  shippingAddress: z.object({
    fullName: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zipCode: z.string().min(1),
    country: z.string().min(1),
    contactNumber: z.string().min(10),
  }),
  status: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]),
})