import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav'
import Footer from './Components/Footer'
import Signup from './Components/Signup'
import Login from './Components/Login'
import AddProduct from './Components/AddProduct'
import PrivateComponent from './Components/PrivateComponent';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/updateProduct/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout</h1>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
