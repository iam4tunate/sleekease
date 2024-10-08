import { Route, Routes } from 'react-router-dom';
import {
  DashboardLayout,
  RequireAuth,
  RootLayout,
  ScrollToTop,
} from './components/shared';
import { Toaster } from './components/ui/sonner';
import Home from './pages/customer/Home';
import Category from './pages/customer/Category';
import Shop from './pages/customer/Shop';
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
import Checkout from './pages/customer/Checkout';
import NotFound from './pages/customer/NotFound';
import Cart from './pages/customer/Cart';

export default function App() {
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/category/:category' element={<Category />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/shop/:id' element={<ProductDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route element={<RequireAuth allowedRoles={['user', 'admin']} />}>
              <Route path='/checkout' element={<Checkout />} />
              <Route element={<DashboardLayout />}>
                <Route path='/customer/overview' element={<Overview />} />
                <Route path='/customer/wishlist' element={<Saved />} />
                <Route path='/customer/orders' element={<Orders />} />
                <Route
                  path='/customer/recently-viewed'
                  element={<RecentlyViewed />}
                />
              </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={['admin']} />}>
              <Route element={<DashboardLayout />}>
                <Route path='/admin/create' element={<CreateProduct />} />
                <Route path='/admin/update/:id' element={<UpdateProduct />} />
                <Route path='/admin/list' element={<ProductList />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>

      <Toaster richColors className='font-rubikMedium max-md:mb-11' />
    </>
  );
}
