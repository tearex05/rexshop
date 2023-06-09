import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GrMenu } from "react-icons/gr";
import { RiHome2Line } from "react-icons/ri";
import { BsCart2 } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { addString } from "../redux/search";

function Nav() {
	const location = useLocation();
	useEffect(() => {
		setStyle({
			...style,
			move: "-translate-x-full",
			hidden: "hidden",
			margin: "m-0",
			round: "rounded-none",
		});
	}, [location]);
	const searchString = useSelector((state) => state?.searchReducer);
	const [itemSearched, setItemSearched] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const items = useSelector((state) => state?.itemReducer);
	let user = JSON.parse(localStorage.getItem("user"));
	const logOut = () => {
		localStorage.removeItem("user");
		navigate("/rexshop/signin");
	};
	const onSearch = () => {
		dispatch(addString(itemSearched));
		setItemSearched("");
		navigate("/rexshop/search");
	};
	const [style, setStyle] = useState({
		move: "-translate-x-full",
		hidden: "hidden",
		margin: "m-0",
		round: "rounded-none",
	});
	const catHandler = () => {
		if (style.hidden === "hidden") {
			setStyle({ ...style, hidden: "block" });
		} else {
			setStyle({ ...style, hidden: "hidden" });
		}
	};
	const styleHandler = () => {
		if (style.move === "-translate-x-full") {
			setStyle({
				...style,
				move: "translate-x-0",
				hidden: "hidden",
				margin: "m-3",
				round: "rounded-full",
			});
		} else {
			setStyle({
				...style,
				move: "-translate-x-full",
				hidden: "hidden",
				margin: "m-0",
				round: "rounded-none",
			});
		}
	};
	return (
		<>
			<div className="fixed z-10 w-screen flex items-center justify-between pr-2 top-0">
				<span
					onClick={styleHandler}
					className="mr-5 bg-main text-3xl p-3 flex items-center justify-center cursor-pointer"
				>
					<GrMenu color="white" />
				</span>
				{location.pathname === "/rexshop/search" ? (
					<span className="border border-black rounded-xl pl-3 p-1 flex items-center justify-between w-full mx-3 max-w-4xl bg-white">
					<input
						type="text"
						className="w-full self-center  outline-none"
						placeholder="Search..."
						value={itemSearched}
						onChange={(e) => setItemSearched(e.target.value)}
					/>
					<span
						className="text-2xl bg-main1 text-white p-1 rounded-xl cursor-pointer"
						onClick={onSearch}
					>
						<BiSearch className="" />
					</span>
				</span>
				) : (
					<Link
						to="/rexshop/search"
						className="text-2xl bg-main1 text-white p-1 rounded-xl cursor-pointer"
					>
						<BiSearch className="" />
					</Link>
				)}
				<div className="mx-2 mr-5 flex items-center justify-end w-fit">
					<Link
						to="/rexshop/cart"
						className="cursor-pointer xxl relative"
					>
						<BsCart2 />
						<div className="bg-main1 text-white w-4 h-4 rounded-full absolute bottom-0 right-0 text-sm text-center flex items-center  justify-center">
							{items.length}
						</div>
					</Link>
					{user && (
						<Link
							to={`/rexshop/me/${user.id}`}
							style={{ backgroundImage: `url(${user.image})` }}
							className="bg h-9 w-9 ml-5 border-white border-2 rounded-full "
						></Link>
					)}
				</div>
			</div>
			<div
				className={`h-screen w-1/2 md:w-1/3 bg-main1 fixed top-0 left-0 z-10 flex flex-col items-center justify-around text-black text-xl text-white ${style.move} tran`}
			>
				<span
					className="absolute mr-4 text-5xl top-0 right-0 cursor-pointer"
					onClick={styleHandler}
				>
					×
				</span>
				<Link className="hover:text-slate-300" to="/rexshop">
					Home
				</Link>
				{user && (
					<Link className="hover:text-slate-300" to="/rexshop/create">
						Add an item
					</Link>
				)}
				<div>
					<button
						className="hover:text-slate-300"
						onClick={catHandler}
					>
						{style.hidden === "hidden" ? "+" : "-"} Categories
					</button>
					<div
						className={`flex flex-col items-start justify-around ${style.hidden}`}
					>
						<Link
							to="/rexshop/category/electronics"
							className="pl-10 mt-6 hover:text-slate-300"
						>
							Electronics
						</Link>
						<Link
							to="/rexshop/category/clothes"
							className="pl-10 mt-6 hover:text-slate-300"
						>
							Clothes
						</Link>
						<Link
							to="/rexshop/category/food"
							className="pl-10 mt-6 hover:text-slate-300"
						>
							Food
						</Link>
						<Link
							to="/rexshop/category/car"
							className="pl-10 mt-6 hover:text-slate-300"
						>
							Car
						</Link>
						<Link
							to="/rexshop/category/house"
							className="pl-10 mt-6 hover:text-slate-300"
						>
							House
						</Link>
					</div>
				</div>
				<Link to="/rexshop/contact" className="hover:text-slate-300">
					Contact us
				</Link>
				{user ? (
					<button onClick={logOut} className="hover:text-slate-300">
						Log Out
					</button>
				) : (
					<div className="flex items-center">
						<Link
							to="/rexshop/signup"
							className="hover:text-slate-300"
						>
							SignUp
						</Link>
						<span className="mx-2">|</span>
						<Link
							to="/rexshop/signin"
							className="hover:text-slate-300"
						>
							SignIn
						</Link>
					</div>
				)}
			</div>
		</>
	);
}

export default Nav;
