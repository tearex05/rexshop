import { BrowserRouter as R, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ItemPage from "./pages/ItemPage";
import Update from "./pages/Update";
import Purchase from "./pages/Purchase";
import Me from "./pages/Me";
import UpdateMe from "./pages/UpdateMe";
import SearchPage from "./pages/SearchPage";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import Nav from "./components/Nav";

function App() {
  return (
    <R>
      <Nav />
      <Routes>
        <Route path="/rexshop" exact element={<Home />} />
        <Route path="/rexshop/create" element={<Create />} />
        <Route path="/rexshop/search" element={<SearchPage />} />
        <Route path="/rexshop/purchase" element={<Purchase />} />
        <Route path="/rexshop/signup" element={<Signup />} />
        <Route path="/rexshop/signin" element={<Signin />} />
        <Route path="/rexshop/item/:id" element={<ItemPage />} />
        <Route path="/rexshop/item/:id/update" element={<Update />} />
        <Route path="/rexshop/category/:category" element={<CategoryPage />} />
        <Route path="/rexshop/contact" element={<Contact />} />
        <Route path="/rexshop/cart" element={<Cart />} />
        <Route path="/rexshop/me/:id" element={<Me />} />
        <Route path="/rexshop/me/:id/update" element={<UpdateMe />} />
      </Routes>
    </R>
  );
}

export default App;
