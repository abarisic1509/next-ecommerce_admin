const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;

export const uploadImageToCloudinary = async (image) => {
	const formData = new FormData();
	formData.append("file", image);
	formData.append("upload_preset", "of3mrwl7"); // Replace with your Cloudinary upload preset

	const response = await fetch(
		`https://api.cloudinary.com/v1_1/duipztnnd/image/upload`,
		{
			method: "POST",
			body: formData,
		}
	);

	const data = await response.json();
	return data.secure_url;
};
