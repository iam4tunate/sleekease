import { Route, Routes } from 'react-router-dom';
import {
  Cart,
  Category,
  Home,
  Login,
  Orders,
  Overview,
  RecentlyViewed,
  Register,
  Saved,
} from './pages';
import { DashboardLayout, RootLayout, ScrollToTop } from './components/shared';
import { Toaster } from 'sonner';
import PrivateRoutes from './lib/PrivateRoutes';

export default function App() {
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/category/:id' element={<Category />} />
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
                <Route path='/admin/create' element={<RecentlyViewed />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>

      <Toaster richColors className='font-rubikMedium' />
    </>
  );
}
