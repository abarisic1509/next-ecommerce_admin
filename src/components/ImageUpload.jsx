"use client";
import React, { useCallback, useRef, useState } from "react";
import { useFormikContext } from "formik";
import { MdDeleteOutline, MdUpload } from "react-icons/md";

export default function ImageUpload({ name, id, errors, touched, type }) {
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [filesWithProps, setFilesWithProps] = useState([]);
	const fileInputRef = useRef();
	const { setFieldValue } = useFormikContext();

	const handleImageSelect = useCallback(
		(event) => {
			const file = event.target.files[0];
			setSelectedImage(file);
			setFieldValue(name, { file });
		},
		[name, setFieldValue]
	);
	const handleFileSelect = useCallback(
		(event) => {
			const files = Array.from(event.target.files);
			const propFiles = files.map((file) => ({
				file,
			}));
			setFilesWithProps((prevFilesWithProps) => {
				return [...prevFilesWithProps, ...propFiles];
			});
			setSelectedFiles((prevSelectedFiles) => {
				return [...prevSelectedFiles, ...files];
			});
			setFieldValue(name, [...filesWithProps]);
			console.log("files", files);
			// console.log("propFiles", propFiles);
			// console.log("selectedFiles", selectedFiles);
		},
		[name, setFieldValue, filesWithProps, setFilesWithProps, setSelectedFiles]
	);

	const handleRemoveFile = useCallback(
		(index) => {
			setSelectedFiles((prevSelectedFiles) => {
				const updatedFiles = [...prevSelectedFiles];
				updatedFiles.splice(index, 1);
				return updatedFiles;
			});
			setFilesWithProps((prevFiles) => {
				const updatedFiles = [...prevFiles];
				updatedFiles.splice(index, 1);
				return updatedFiles;
			});
			setFieldValue(name, [
				...filesWithProps.slice(0, index),
				...filesWithProps.slice(index + 1),
			]);
		},
		[name, setFieldValue, filesWithProps, setFilesWithProps, setSelectedFiles]
	);

	const clearSelectedFiles = useCallback(() => {
		setSelectedFiles([]);
		setFilesWithProps([]);
		setFieldValue(name, []);
		fileInputRef.current.value = "";
	}, []);

	// useEffect(() => {
	// 	return () => {
	// 		// Clear selected files when the component is unmounted
	// 		clearSelectedFiles();
	// 	};
	// }, [clearSelectedFiles]);

	if (type === "multiple") {
		return (
			<div className="flex flex-col gap-2">
				<span>Image gallery</span>
				<label
					htmlFor={id}
					className="w-full flex gap-2 items-center cursor-pointer border border-slate-300 py-2 px-3 text-6xl"
				>
					<input
						type="file"
						name={name}
						id={id}
						multiple
						accept="image/jpeg, image/png, image/jpg, image/webp"
						onChange={handleFileSelect}
						ref={fileInputRef}
						className="hidden outline-none absolute top-0 left-0 w-full h-full"
					/>
					<div className="bg-slate-500 h-full w-40  p-3 flex  flex-col gap-2 items-center justify-center">
						<MdUpload />
						<p className=" text-base text-center">Click to upload images</p>
					</div>
					{selectedFiles.length > 0 && (
						<div>
							<div className="flex flex-wrap gap-4">
								{selectedFiles.map((file, index) => (
									<div
										key={index}
										className="relative h-40 w-[130px] flex items-center justify-center border border-slate-500 p-2"
									>
										<img
											src={URL.createObjectURL(file)}
											alt={`Preview ${index}`}
											className=" object-contain max-h-full object-center"
										/>
										<button
											type="button"
											onClick={() => handleRemoveFile(index)}
											className="absolute bottom-0 left-0 w-10 h-10 grid place-items-center border-red-700 bg-red-50 text-red-700 text-2xl"
										>
											<MdDeleteOutline />
										</button>
									</div>
								))}
							</div>
						</div>
					)}
				</label>

				{selectedFiles.length > 0 && (
					<button
						type="button"
						className=" text-base bg-red-800 px-4 cursor-pointer w-fit ml-auto"
						onClick={clearSelectedFiles}
					>
						Clear All
					</button>
				)}
				{errors && touched && <p className=" text-red-600">{errors}</p>}
			</div>
		);
	}

	return (
		<label htmlFor={id} className="flex flex-col gap-2">
			<span>Featured image</span>
			<div className="w-40 h-40 relative grid place-items-center cursor-pointer border border-slate-300 py-2 px-3 text-6xl">
				<input
					type="file"
					name={name}
					id={id}
					accept="image/jpeg, image/png, image/jpg, image/webp"
					onChange={handleImageSelect}
					className="hidden absolute top-0 left-0 w-full h-full"
				/>
				{!selectedImage && <p className="text-xl">Choose</p>}
				{selectedImage && (
					<img
						src={URL.createObjectURL(selectedImage)}
						alt="Featured image"
						className=" object-contain max-h-full object-center"
					/>
				)}
			</div>
			{errors && touched && <p className=" text-red-600">{errors}</p>}
		</label>
	);
}
