import ItemLine from "../components/ItemLine"
import {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import axios from "axios"

function SearchPage() {
	const searchString = useSelector(state => state.searchReducer)
	const [allItems, setAllItems] = useState([])
	const [items, setItems] = useState([])
	useEffect(() => {
		axios.get("https://rexshop.onrender.com/items")
			.then(res => setAllItems(res.data));
		setItems(allItems.filter(i => i.name.toLowerCase().includes(searchString.toLowerCase())))
	} ,[searchString])
	if(items.length == 0){
		return (
			<div className="mt-20 w-full h-full flex flex-col items-center justify-center text-center">
			<h1 className="text-2xl">Nothing was found</h1>
		</div>
		)
	}
	return (
		<div className="mt-20 w-full min-h-screen flex flex-col items-center">
			<h1 className="text-2xl mb-5 font-bold">{items.length} item{items.length > 1 ? ("s") : ("")}{" "}{items.length > 1 ? ("were") : ("was")} found for "{searchString}"</h1>
			{items.map(i => (
				<ItemLine key={i.id} item={i} />
			))}
		</div>
	)
}

export default SearchPage