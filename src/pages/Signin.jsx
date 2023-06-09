import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signin() {
	let user = JSON.parse(localStorage.getItem("user"));
	const [formData, setFormData] = useState({
		email: "",
		pass: "",
		error: "",
		btn: "SignIn",
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
		if (!formData.email || !formData.pass) {
			setFormData({ ...formData, error: "Please fill every field" });
		} else {
			setFormData({ ...formData, btn: "Plz Wait..." });
			let data = {
				"email": formData.email,
				"password": formData.pass,
			};
			axios
				.post("https://rexshop.onrender.com/auth/signin", data)
				.then((res) => {
					setFormData({ ...formData, btn: "SignIn" });
					localStorage.setItem("user", JSON.stringify(res.data));
				})
				.catch((err) => setFormData({...formData, error: err.response.data}));
		}
	};
	return (
		<div className="flex flex-col w-full min-h-screen items-center justify-center pt-20 pb-20 ">
			<h1 className="text-4xl font-bold">SignIn</h1>
			<form
				className="flex flex-col items-center mt-6 shadow-2xl rounded-2xl p-5 w-2/3 max-w-2xl"
				onSubmit={submitHandler}
			>
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
				<p className="text-red-500">{formData.error}</p>
				<input
					type="submit"
					disabled={formData.btn === "Plz Wait..." ? true : false}
					value={formData.btn}
					className="my-3 bg-gradient-to-r from-emerald-300 rounded-xl to-emerald-500 p-2 cursor-pointer"
				/>
				<p className="">
					Don't have an account?{" "}
					<Link className="text-blue-600" to="/rexshop/signup">
						SignUp
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Signin;
