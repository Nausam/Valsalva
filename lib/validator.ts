import * as z from "zod";

export const productFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Descrtiption must be at least 3 characters long")
    .max(400, "Descrtiption must be less than 400 characters"),
  imageUrl: z.string(),
  categoryId: z.string(),
  price: z.string(),
  isAvailable: z.boolean(),
  footPocketColor: z.string().min(3, "Please add a color"),
});

export const profileFormSchema = z.object({
  street: z.string().min(1, "Street cannot be empty"),
  city: z.string().min(1, "City cannot be empty"),
  zipCode: z.string().min(1, "Zip code cannot be empty"),
  country: z.string().min(1, "Country cannot be empty"),
  phoneNumber: z.string().min(1, "Phone number cannot be empty"),
});
