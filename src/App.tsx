import { Route, Routes } from 'react-router-dom';
import { DashboardLayout, RootLayout, ScrollToTop } from './components/shared';
import PrivateRoutes from './lib/PrivateRoutes';
import { Toaster } from './components/ui/sonner';
import AdminRoutes from './lib/AdminRoutes';
import Home from './pages/customer/Home';
import Cart from './pages/customer/Cart';
import Category from './pages/customer/Category';
import Explore from './pages/customer/Explore';
import ProductDetails from './pages/customer/ProductDetails';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Overview from './pages/customer/Overview';
import Saved from './pages/customer/Saved';
import Orders from './pages/customer/Orders';
import RecentlyViewed from './pages/customer/RecentlyViewed';
import CreateProduct from './pages/admin/CreateProduct';
import ProductList from './pages/admin/ProductList';
import UpdateProduct from './pages/admin/UpdateProduct';

export default function App() {
  return (
    <>
      {/* TODO: CREATE 1. *PAGE NOT FOUND FFOR ALL WRONG ROUTING, SHADCN SKELETON FOR ALL LOADING STATES AND EMPTY RESULT UI FOR CART,SAVED AND OTHERS  */}
      <ScrollToTop>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/category/:category' element={<Category />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route element={<PrivateRoutes />}>
              <Route element={<DashboardLayout />}>
                <Route path='/customer/overview' element={<Overview />} />
                <Route path='/customer/saved' element={<Saved />} />
                <Route path='/customer/orders' element={<Orders />} />
                <Route
                  path='/customer/recently-viewed'
                  element={<RecentlyViewed />}
                />
              </Route>
            </Route>

            <Route element={<AdminRoutes />}>
              <Route element={<DashboardLayout />}>
                <Route path='/admin/create' element={<CreateProduct />} />
                <Route path='/admin/update/:id' element={<UpdateProduct />} />
                <Route path='/admin/list' element={<ProductList />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>

      <Toaster richColors className='font-rubikMedium mb-6 max-md:mb-11' />
    </>
  );
}
