import {useState, useEffect} from 'react'
import axios from "axios"
import {useParams, useNavigate} from "react-router-dom"
import FileBase64 from "react-file-base64";

function UpdateMe() {
	const navigate = useNavigate()
	const {id} = useParams()
	const [user, setUser] = useState({
		id: "",
		name: "",
		email: "",
		image: "",
		pass: "",
		pass2: "",
		error: "",
		btn: "Submit"
	})
	useEffect(() => {
		axios.get(`https://rexshop.onrender.com/auth/me/${id}`)
		.then(res => setUser({...user, id:res.data.id, name: res.data.name, email: res.data.email}))
		.catch(err => setUser({...user, error: err}))
	}, [id])
	const changeHandler = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (
			!user.name ||
			!user.email ||
			!user.pass ||
			!user.pass2 ||
			!user.image
		) {
			setUser({ ...user, error: "Plz fill every field" });
		} else {
			setUser({...user, btn: "Plz Wait..."})
			let data = {
				name: user.name,
				email: user.email,
				image: user.image,
				password: user.pass
			}
			axios.put(`https://rexshop.onrender.com/auth/updateuser/${user.id}`, data).then((res) => {
				setUser({ ...user, btn: "Submit" });
				navigate("/rexshop");
			});
		}
	}
	if(!user.id){
		return (
			<div className="w-screen h-screen flex items-center justify-center text-center">
				<h1 className="text-3xl">Hold on...</h1>
			</div>
		)
	}
	if(user?.id != id){
		return (
			<div className="w-screen h-screen flex items-center justify-center text-center">
				<h1 className="text-3xl">...</h1>
			</div>
		)
	}
	return (
		<div className="w-full min-h-screen bg-gradient-to-br from-white to-gray-300 flex flex-col items-center justify-center">
			<h1 className="font-bold text-3xl mt-20">Update Your Profile</h1>
			<form
				className="flex flex-col items-center mt-6 shadow-2xl rounded-2xl p-5 w-2/3 max-w-2xl bg-white"
				onSubmit={submitHandler}
			>
				<label htmlFor="name">Name:</label>
				<input
					id="name"
					type="text"
					name="name"
					value={user.name}
					onChange={changeHandler}
					placeholder="Enter user's name"
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4 bg-white"
				/>
				<label htmlFor="email">Email:</label>
				<input
					id="email"
					type="email"
					name="email"
					value={user.email}
					onChange={changeHandler}
					placeholder="Enter user's email"
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4 bg-white"
				/>
				<label htmlFor="pass">Password:</label>
				<input
					id="pass"
					type="password"
					name="pass"
					value={user.pass}
					onChange={changeHandler}
					placeholder="Enter user's password"
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4 bg-white"
				/>
				<label htmlFor="pass2">Confirm Your Password:</label>
				<input
					id="pass2"
					type="password"
					name="pass2"
					value={user.pass2}
					onChange={changeHandler}
					placeholder="reEnter user's password"
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4 bg-white"
				/>
				<label htmlFor="image">Image:</label>
				<span
					className="border-2 border-black w-10/12 max-w-4xl p-2 mb-4"
					id="image"
					name="image"
				>
					<FileBase64
						multiple={false}
						onDone={({base64}) => setUser({...user, image: base64})}
					/>
				</span>
				<p className="text-red-500">{user.error}</p>
				<input
					type="submit"
					value={user.btn}
					className="my-3 bg-gradient-to-r from-emerald-300 rounded-xl to-emerald-500 p-2 cursor-pointer"
				/>
			</form>
		</div>
	)
}

export default UpdateMe