import React from 'react'
import {Link} from "react-router-dom"

function Item({item}) {
	return (
		<Link to={`/rexshop/item/${item.id}`}>
			<div className="w-fit shadow-2xl rounded-2xl p-3 hover:-translate-y-3 cursor-pointer tran place-content-center justify-center mb-5">
			<img src={item.image} loading="lazy" alt={item.name} className="w-full pb-3" />
			<div className="flex flex-col">
				<div className="flex items-center justify-between">
					<p className="text-xl">{item.name}</p>
					</div>
			<p className="">Price: ${item.price.toFixed(2)}</p>
			</div>
		</div>
		</Link>
	)
}

export default Item