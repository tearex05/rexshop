import React from 'react'
import {Link} from "react-router-dom"

function Category({name, image, color}) {
	return (
		<Link to={`/rexshop/category/${name.toLowerCase()}`}>
			<div style={{backgroundImage: `url(${image})`}} className="bg text-center justify-center items-center w-full flex h-60 mb-5 hover:-translate-y-2 tran2">
				<p className={`text-4xl font-black text-${color} w-full h-full flex items-center justify-center text-center bg-blur`}>{name}</p>
			</div>
		</Link>
	)
}

export default Category