import {useState, useEffect} from 'react'
import axios from "axios"
import {useParams, Link} from "react-router-dom"
import {BiPencil} from "react-icons/bi"
import {RiDeleteBinLine} from "react-icons/ri"

function Me() {
	const {id} = useParams()
	const [user, setUser] = useState({})
	useEffect(() => {
		axios.get(`https://rexshop.onrender.com/auth/me/${id}`)
		.then(res => setUser(res.data))
	}, [id])
	const deleteUser = () => {
		axios.delete(`https://rexshop.onrender.com/auth/me/delete/${user.id}`)
	}
	if(user?.id != id){
		return (
			<div className="w-screen h-screen flex items-center justify-center text-center">
				<h1 className="text-3xl">...</h1>
			</div>
		)
	}
	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center">
			<div className="w-fit px-5 flex flex-col items-center justify-center lg:flex-row bg-gray-100 shadow-2xl rounded py-8 px-2 relative">
				<div className="flex flex-row lg:flex-col items-center justify-around absolute right-0 mr-4 top-0 lg:top-auto">
					<Link to={`/rexshop/me/${user.id}/update`} className="text-3xl bg-gradient-to-br from-emerald-300 to-emerald-500 p-1 rounded text-black mt-2 cursor-pointer mr-3 lg:mr-0">
							<BiPencil />
						</Link>
						<span onClick={deleteUser} className="text-3xl bg-gradient-to-br from-red-400 to-red-500 p-1 rounded text-black mt-2 cursor-pointer">
							<RiDeleteBinLine />
						</span>
				</div>
				<div className="flex flex-col items-start justify-center mb-12 lg:mb-0 text-2xl lg:mr-10">
				<p className="mb-2">Name:<br /> <span className="text-3xl font-bold ml-4">{user.name}</span></p>
				<p>Email:<br /> <span className="text-3xl font-bold ml-4">{user.email}</span></p>
			</div>
			<div style={{backgroundImage: `url(${user.image})`}} className="rounded-full w-60 h-60 bg lg:mr-16"></div>
			</div>
		</div>
	)
}

export default Me