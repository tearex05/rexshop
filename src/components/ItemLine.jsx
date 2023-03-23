import {Link} from "react-router-dom"

function ItemLine({item}) {
	return (
		<div className="w-3/4 md:w-11/12 h-fit grid grid-cols-1 md:grid-cols-3 justify-between p-3 h-fit border border-black rounded mb-5 items-center place-items-center">
			<img src={item.image} alt="" className="h-28" />
			<div className="flex flex-col items-center justify-center">
				<p className="text-4xl font-bold">{item.name}</p>
				<p className="">Price: ${item.price.toFixed(2)}</p>
			</div>
			<Link to={`/rexshop/item/${item.id}`} className="bg-main text-white p-2 mt-2 md:m-0 w-16 text-center hover:w-20 tran">More</Link>
		</div>
	)
}

export default ItemLine