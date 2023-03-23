import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ItemLine from "../components/ItemLine";
import Masonry from "react-masonry-css";

function CategoryPage() {
	const { category } = useParams();
	const [items, setItems] = useState([]);
	useEffect(() => {
		axios.get(`http://localhost:5000/category/${category}`).then((res) => {
			setItems(res.data);
			console.log(res.data);
		});
	});
	let breakpointColumnsObj = {
		100000000: 4,
		1000: 3,
		700: 2,
		500: 1,
	};
	return (
		<div className="">
			<h1 className="text-4xl font-bold mt-20 w-full text-center mb-5">
				{category.charAt(0).toUpperCase() + category.slice(1)}
			</h1>
				<div className="flex flex-col px-4 items-center w-full">
					{items.map((item) => (
						<ItemLine item={item} />
					))}
				</div>
		</div>
	);
}

export default CategoryPage;
