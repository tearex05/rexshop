import { useState, useEffect } from "react";
import Slider from "../components/Slider";
import Item from "../components/Item";
import axios from "axios";
import Masonry from "react-masonry-css";
import Category from "../components/Category"
import cars from "../assets/cars.jpg"
import clothes_image from "../assets/clothes.jpg"
import food from "../assets/food.jpg"
import houses from "../assets/houses.jpg"
import tech from "../assets/tech.jpg"

function Home() {
	const [electronics, setElectronics] = useState([]);
	const [clothes, setClothes] = useState([]);
	let breakpointColumnsObj = {
		100000000: 4,
		1000: 3,
		700: 2,
		500: 1,
	};
	useEffect(() => {
		axios
			.get("http://localhost:5000/category/electronics")
			.then((res) => setElectronics(res.data));
		axios
			.get("http://localhost:5000/category/clothes")
			.then((res) => setClothes(res.data));
	});
	return (
		<div className="py-16">
			<Slider />
			<h1 className="text-4xl font-bold mt-20 w-full text-center mb-5">
				Top Selling Techs
			</h1>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{electronics.slice(0, 7).map((item) => (
					<Item key={item.id} item={item} />
				))}
			</Masonry>
			<h1 className="text-4xl font-bold mt-20 w-full text-center mb-5">
				Clothes of the year
			</h1>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{clothes.slice(0, 7).map((item) => (
					<Item key={item.id} item={item} />
				))}
			</Masonry>
				<h1 className="text-4xl font-bold mt-20 w-full text-center mb-5">Categories</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-content-center px-10 gap-10">
				<Category name="Electronics" image={tech} color="white" />
				<Category name="Clothes" image={clothes_image} color="white" />
				<Category name="Foods" image={food} color="white" />
				<Category name="Cars" image={cars} color="white" />
				<Category name="Houses" image={houses} color="black" />
			</div>
		</div>
	);
}

export default Home;
