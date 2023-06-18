import * as yup from "yup";

export const productSchema = yup.object().shape({
	name: yup
		.string()
		.min(5, "Product name too short")
		.required("Product name is required"),
	shortDesc: yup
		.string()
		.min(10, "Short description should contain at least 10 characters")
		.max(50, "Shourt description is too long")
		.required("Short description is required"),
	longDesc: yup
		.string()
		.min(50, "Long description should contain at least 50 characters")
		.required("Long description is required"),
	price: yup
		.number()
		.positive("Price must be positive number")
		.required("Price is required"),
});
