import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
	email: {
		type: String,
		unique: [true, "Email already exists"],
		required: [true, "Email is required"],
	},
	image: {
		type: String,
	},
});

const Admin = models.Admin || model("Admin", AdminSchema);

export default Admin;
