import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import FileBase64 from "react-file-base64";

function Signup() {
	let user = JSON.parse(localStorage.getItem("user"));
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		image: "",
		pass: "",
		pass2: "",
		error: "",
		btn: "SignUp",
	});
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate("/rexshop");
		}
	}, [user]);
	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (
			!formData.email ||
			!formData.name ||
			!formData.pass ||
			!formData.pass2 ||
			!formData.image
		) {
			setFormData({ ...formData, error: "Please fill every field" });
		} else if (formData.pass !== formData.pass2) {
			setFormData({ ...formData, error: "Passwords don't match" });
		} else {
			setFormData({ ...formData, btn: "Plz Wait..." });
			let data = {
				name: formData.name,
				email: formData.email,
				password: formData.pass,
				image: formData.image,
			}
			axios
				.post("https://rexshop.onrender.com/auth/signup", data)
				.then((res) => {
					setFormData({ ...formData, btn: "SignUp" });
					localStorage.setItem("user", JSON.stringify(res.data))
				})
				.catch((err) => setFormData({...formData, error: err.response.data}));
		}
	};
	return (
		<div className="flex flex-col w-full min-h-screen items-center justify-center pt-20 pb-20">
			<h1 className="text-4xl font-bold">SignUp</h1>
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
					placeholder="Enter your name"
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4"
				/>
				<label htmlFor="email">Email:</label>
				<input
					id="email"
					type="email"
					name="email"
					placeholder="Enter your email"
					value={formData.email}
					onChange={changeHandler}
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4"
				/>
				<label htmlFor="password">Password:</label>
				<input
					placeholder="Enter your password"
					id="password"
					type="password"
					name="pass"
					value={formData.pass}
					onChange={changeHandler}
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4"
				/>
				<label htmlFor="password2">Confirm Your Password:</label>
				<input
					placeholder="reEnter your password"
					id="password2"
					type="password"
					name="pass2"
					value={formData.pass2}
					onChange={changeHandler}
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4"
				/>
				<label htmlFor="image">Your Profile:</label>
				<span
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4"
					id="image"
					name="image"
				>
					<FileBase64
						multiple={false}
						onDone={({base64}) => setFormData({...formData, image: base64})}
					/>
				</span>
				<p className="text-red-500">{formData.error}</p>
				<input
					type="submit"
					disabled={formData.btn === "Plz Wait..." ? true : false}
					value={formData.btn}
					className="my-3 bg-gradient-to-r from-emerald-300 rounded-xl to-emerald-500 p-2 cursor-pointer"
				/>
				<p className="">
					Have an account?{" "}
					<Link className="text-blue-600" to="/rexshop/signin">
						SignIn
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Signup;
