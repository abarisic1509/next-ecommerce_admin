import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
	name: {
		type: String,
		unique: [true, "Product with that name already exists"],
		required: [true, "Product name is required"],
	},
	price: {
		type: Number,
		required: [true, "Price is required"],
		validate: {
			validator: function (value) {
				return value > 0;
			},
			message: "Price must be a positive number",
		},
	},
	shortDesc: {
		type: String,
		required: [true, "Short description is required"],
	},
	longDesc: {
		type: String,
		required: [true, "Long description is required"],
	},
	featuredImg: {
		type: String,
		required: [true, "Featured image is required"],
	},
	images: {
		type: [String],
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: "Admin",
	},
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
