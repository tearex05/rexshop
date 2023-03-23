import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios"
import {BiPencil} from "react-icons/bi"
import {RiDeleteBinLine} from "react-icons/ri"
import {addItem, removeItem, increaseNumber, decreaseNumber} from "../redux/reducer"

function ItemPage() {
	let user = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const items = useSelector((state) => state.itemReducer)
	const [addedToCart, setAddedToCart] = useState(false);
	const {id} = useParams()
	const [item, setItem] = useState({})
	let isInCart = items.filter(i => i.id === item.id)
	useEffect(() => {
		axios.get(`https://rexshop.onrender.com/item/${id}`).then(res => setItem(res.data))
	})
	const deleteItem = () => {
		axios.delete(`https://rexshop.onrender.com/deleteitem/${item.id}`)
			.then(res => navigate("/rexshop"))
	}
	if(!item.id){
		return (
			<div className="w-screen h-screen flex items-center justify-center text-center">
				<h1 className="text-3xl">Hold on...</h1>
			</div>
		)
	}
	return (
		<div className="lg:grid-cols-2 grid-cols-1 grid items-center justify-center p-4 min-h-screen place-items-center">
			<img src={item.image} alt="Item's Picture" className="h-1s mt-10 lg:mt-0" />
			<div className="flex flex-col justify-center items-center w-full px-5">
				<div className="flex items-center justify-center mb-2">
					{user?.email === item.creator ? (	
						<>
						<p className="text-3xl font-black sm:text-6xl">{item.name}</p>
						<Link to={`/rexshop/item/${item.id}/update`} className="text-3xl ml-10 mr-4 bg-gradient-to-br from-emerald-300 to-emerald-500 p-1 rounded text-black mt-2 cursor-pointer">
							<BiPencil />
						</Link>
						<span onClick={deleteItem} className="text-3xl bg-gradient-to-br from-red-400 to-red-500 p-1 rounded text-black mt-2 cursor-pointer">
							<RiDeleteBinLine />
						</span>
						</>
						) : (
							<p className="text-3xl font-black mb-2 sm:text-6xl">{item.name}</p>
						)}
				</div>
				<p className="text-xl md:text-2xl">
					{item.info}
				</p>
				<p className="mt-8 text-2xl">Price: ${item?.price?.toFixed(2)}</p>
				<div className="">
					{user ? (isInCart?.length !== 0 ? (
							<div className="flex items-center mt-2">
								<button onClick={() => dispatch(removeItem(item))} className="bg-gradient-to-br from-emerald-300 to-emerald-500 p-3 rounded">Remove From Cart</button>
								<div className="flex items-center text-2xl ml-2">
									<button className="mx-4 border border-main1 p-3 rounded h-12 flex items-center justify-center text-center text-3xl" onClick={() => dispatch(decreaseNumber(item))}>-</button>
									<span>{isInCart[0]?.number}</span>
									<button className="mx-4 border border-main1 p-3 rounded h-12 flex items-center justify-center text-center text-3xl" onClick={() => dispatch(increaseNumber(item))}>+</button>
								</div>
							</div>
						) : (
							<button onClick={() => dispatch(addItem(item))} className="bg-gradient-to-br from-emerald-300 to-emerald-500 p-3 rounded mt-2">Add To Cart</button>
						)) : (
						<p className="">
							<Link
								to="/rexshop/signup"
								className="text-blue-500"
							>
								SignUp
							</Link>{" "}
							or{" "}
							<Link
								to="/rexshop/signin"
								className="text-blue-500"
							>
								SignIn
							</Link>{" "}
							to use the cart
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default ItemPage;
