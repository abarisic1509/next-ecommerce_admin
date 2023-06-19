export default function Modal({
	handleConfirm,
	handleClose,
	productId,
	submitting,
}) {
	return (
		<div className="fixed top-0 left-0 w-screen h-screen grid place-items-center bg-slate-800 bg-opacity-75">
			<div className="flex flex-col bg-slate-500 p-6 text-center m-6">
				<h1 className="text-2xl font-bold">
					Are you sure you want to delete selected product?
				</h1>
				<p className="text-xl mt-4">This action cannot be undone!</p>

				<div className="flex gap-3 mt-6 justify-center">
					<button
						onClick={handleClose}
						disabled={submitting}
						className="border border-slate-300 text-slate-300 hover:bg-slate-600 px-4 py-2 h-fit w-fit disabled:opacity-75 disabled:pointer-events-none"
					>
						No, cancel
					</button>
					<button
						onClick={() => {
							handleConfirm(productId);
						}}
						disabled={submitting}
						className=" bg-red-700 text-slate-800 hover:bg-red-800 px-4 py-2 h-fit w-fit disabled:opacity-75 disabled:pointer-events-none"
					>
						Yes, delete
					</button>
				</div>
			</div>
		</div>
	);
}
