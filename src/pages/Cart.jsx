import { useSelector, useDispatch } from "react-redux";
import {
	addItem,
	removeItem,
	increaseNumber,
	decreaseNumber,
	removeAll,
} from "../redux/reducer";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom"

function Cart() {
	const dispatch = useDispatch();
	const items = useSelector((state) => state.itemReducer);
	const calculate = () => {
		let totalPrice = 0;
		items.map((item) => {
			totalPrice += item.price * item.number;
		});
		return totalPrice.toFixed(2);
	};
	if(items.length === 0){
		return (
			<div className="w-full h-screen flex items-center justify-center text-center">
				<h1 className="text-3xl">No item in cart</h1>
			</div>
		)
	}
	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center">
			<h1 className="text-4xl font-bold">Cart</h1>
			<table className="mt-2 items-center justify-center text-center place-content-center place-items-center">
				<thead>
					<tr className="border-b border-black">
						<th className="p-2 " scope="col">
							id
						</th>
						<th className="p-2 " scope="col">
							image
						</th>
						<th className="p-2" scope="col">
							name
						</th>
						<th className="p-2" scope="col">
							number
						</th>
						<th className="p-2" scope="col">
							price
						</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={items.indexOf(item)} className="border-b border-black">
							<td className="p-2">
								{items.indexOf(item) + 1}
							</td>
							<td className="p-2">
								<img
									src={item.image}
									alt=""
									className="h-12"
								/>
							</td>
							<td className="p-2">
								<p className="">{item.name}</p>
							</td>
							<td className="p-2">
								<p className="flex items-center justify-around">
									<button onClick={() => dispatch(decreaseNumber(item))} className="text-2xl font-black rounded px-2 mb-1">-</button>
									<span className="mx-3 text-xl">{item.number}</span>
									<button onClick={() => dispatch(increaseNumber(item))} className="text-2xl font-black rounded px-2 mb-1">+</button>
								</p>
							</td>
							<td className="p-2">
								<p className="">${(item.price * item.number).toFixed(2)}</p>
							</td>
							<td className="p-2">
								<button
									onClick={() => dispatch(removeItem(item))}
									className="p-2 rounded bg-gradient-to-br from-red-400 to-red-600"
								>
									Remove
								</button>
							</td>
						</tr>
					))}
					<tr>
						<td className="p-2"></td>
						<td className="p-2"></td>
						<td className="p-2"></td>
						<td className="p-2">
							<p className="font-bold">Total Price: </p>
						</td>
						<td className="p-2 font-bold">${calculate()}</td>
						<td className="p-2">
							<button
								onClick={() => dispatch(removeAll())}
								className="bg-black text-white p-2 rounded font-bold"
							>
								Remove All
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<Link onClick={() => dispatch(removeAll())} to="/rexshop/purchase" className="bg-green-500 p-2 rounded w-1/4 hover:w-1/3 tran mt-5 text-center">
				Purchase all
			</Link>
		</div>
	);
}

export default Cart;
