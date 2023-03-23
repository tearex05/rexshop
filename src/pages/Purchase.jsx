import React from 'react'
import {Link} from "react-router-dom"

function Purchase() {
	return (
		<div className="w-full h-screen bg-gradient-to-bl from-green-300 to-green-100 flex flex-col items-center justify-center text-center">
			<h1 className="text-2xl lg:text-4xl font-bold text-black">Purchase was successful</h1>
			<Link to="/rexshop" className="mt-5 bg-black text-white p-2 text-xl">Home Page</Link>
		</div>
	)
}

export default Purchase