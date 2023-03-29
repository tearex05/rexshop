import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FileBase64 from "react-file-base64";

function Create() {
	const navigate = useNavigate();
	let user = JSON.parse(localStorage.getItem("user"));
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		category: "electronics",
		creator: user?.email,
		info: "",
		image: "",
		error: "",
		btn: "Submit",
	});
	const [path, setPath] = useState("");
	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (
			!formData.name ||
			!formData.price ||
			!formData.category ||
			!formData.info ||
			!formData.image
		) {
			setFormData({ ...formData, error: "Plz fill every field" });
		} else if (formData.image.size >= 3000000) {
			setFormData({ ...formData, error: "Image size should be < 3mb" });
		} else {
			setFormData({ ...formData, btn: "Plz Wait..." });
			axios
				.post("https://rexshop.onrender.com/createitem", formData)
				.then((res) => {
					setFormData({ ...formData, btn: "Submit" });
					navigate("/rexshop");
				});
		}
	};
	if (!user) {
		return (
			<div className="w-screen h-screen overflow-hidden flex items-center justify-center text-center">
				<h1 className="font-thin text-3xl">
					<Link
						className="text-blue-500 font-bold"
						to="/rexshop/signup"
					>
						SignUp
					</Link>{" "}
					or{" "}
					<Link
						className="text-blue-500 font-bold"
						to="/rexshop/signin"
					>
						SignIn
					</Link>{" "}
					to add an item
				</h1>
			</div>
		);
	}
	return (
		<div className="flex flex-col w-full h-full items-center justify-center pt-20 pb-20">
			<h1 className="text-4xl font-bold">Add An Item</h1>
			<form
				className="flex flex-col items-center mt-6 shadow-2xl rounded-2xl p-5 w-2/3 max-w-2xl"
				onSubmit={submitHandler}
			>
				<label htmlFor="name">Name:</label>
				<input
					id="name"
					type="text"
					name="name"
					value={formData.name}
					onChange={changeHandler}
					placeholder="Enter item's name"
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4"
				/>
				<label htmlFor="price">Price:</label>
				<input
					id="price"
					type="number"
					name="price"
					placeholder="0"
					value={formData.price}
					onChange={changeHandler}
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4"
				/>
				<label htmlFor="info">Info:</label>
				<textarea
					id="info"
					name="info"
					rows="10"
					value={formData.info}
					onChange={changeHandler}
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4 resize-y max-h-40"
					placeholder="Enter item's info"
				></textarea>
				<label htmlFor="category">Category:</label>
				<select
					name="category"
					id="lang"
					value={formData.category}
					onChange={changeHandler}
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4"
				>
					<option value="electronics">Electronics</option>
					<option value="clothes">Clothes</option>
					<option value="food">Food</option>
					<option value="car">Car</option>
					<option value="house">House</option>
				</select>
				<label htmlFor="picture">Picture:</label>
				<span
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4"
					id="picture"
					name="picture"
				>
					<FileBase64
						multiple={false}
						onDone={({base64}) => setFormData({...formData, image: base64})}
					/>
				</span>
				<p className="text-red-500">{formData.error}</p>
				<input
					type="submit"
					value={formData.btn}
					className="my-3 bg-gradient-to-r from-emerald-300 rounded-xl to-emerald-500 p-2 cursor-pointer"
				/>
			</form>
		</div>
	);
}

export default Create;
