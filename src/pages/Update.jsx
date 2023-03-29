import {useState, useEffect} from 'react'
import axios from "axios"
import {useParams, useNavigate} from "react-router-dom"
import FileBase64 from "react-file-base64";

function Update() {
	const navigate = useNavigate();
	let user = JSON.parse(localStorage.getItem("user"));
	const {id} = useParams()
	useEffect(() => {
		axios.get(`https://rexshop.onrender.com/item/${id}`)
		.then(res => {
			setFormData({...formData, id: res.data.id, name: res.data.name, price: res.data.price, category: res.data.category, info: res.data.info, creator: res.data.creator})
		})
	}, [])
	const [formData, setFormData] = useState({
		id: "",
		name: "",
		price: 0,
		category: "",
		creator: "",
		info: "",
		image: "",
		error: "",
		btn: "Submit",
	});
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
		} else {
			setFormData({...formData, btn: "Plz Wait..."})
			axios.put(`https://rexshop.onrender.com/updateitem/${formData.id}`, formData).then((res) => {
				setFormData({ ...formData, btn: "Submit" });
				navigate("/rexshop");
			});
		}
	};
	if(!formData.id){
		return (
			<div className="w-screen h-screen flex items-center justify-center text-center">
				<h1 className="text-3xl">Hold on...</h1>
			</div>
		)
	}
	if(formData.creator !== user[0].email){
		return (
			<div className="w-screen h-screen flex items-center justify-center text-center">
				<h1 className="text-3xl">...</h1>
			</div>
		)	
	}
	return (
		<div className="w-full min-h-screen bg-gradient-to-br from-white to-gray-300 flex flex-col items-center justify-center">
			<h1 className="font-bold text-3xl mt-20">Update Your Item</h1>
			<form
				className="flex flex-col items-center mt-6 shadow-2xl rounded-2xl p-5 w-2/3 max-w-2xl bg-white"
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
	)
}

export default Update