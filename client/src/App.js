import { Routes, Route } from 'react-router-dom';
import { ForgotPassword, Home, Login, Register, Shop, Aboutus, Contact, ShoppingCart, Dashboard, LHeader, AddProductType, ProductType, Product, Setting, ProductDetails } from './containers/public'
import { path } from './ultils/constant';
import { CartProvider } from './containers/system/cartContext';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Register />} />
        <Route path={path.FORGOTPASSWORD} element={<ForgotPassword />} />
        <Route path={path.SHOP} element={<Shop />} />
        <Route path={path.ABOUTUS} element={<Aboutus />} />
        <Route path={path.CONTACT} element={<Contact />} />
        <Route path={path.SHOPPINGCART} element={<ShoppingCart />} />
        <Route path={path.DASHBOARD} element={<Dashboard />} />
        <Route path={path.LHEADER} element={<LHeader />} />
        <Route path={path.ADDPRODUCTTYPE} element={<AddProductType />}></Route>
        <Route path={path.PRODUCTTYPE} element={<ProductType />}></Route>
        <Route path={path.PRODUCT} element={<Product />}></Route>
        <Route path={path.SETTING} element={<Setting />}></Route>
        <Route path={path.PRODUCTDETAILS} element={<ProductDetails />}></Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
