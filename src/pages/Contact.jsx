import React from 'react'

function Contact() {
	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center text-center text-2xl sm:text-3xl md:text-5xl font-bold cursor-pointer bg-gradient-to-b from-emerald-300 to-main">
			<p className="mb-8 md:hover:-rotate-1 tran2">Email: <span className="text-white">rexshop@gmail.com</span></p>
			<p className="md:hover:-rotate-1 tran2">Phone: <span className="text-white">999-465-972</span></p>
		</div>
	)
}

export default Contact