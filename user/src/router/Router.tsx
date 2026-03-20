import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoutes"
import Login from "../views/Login"
import Register from "../views/Register"
import CategoryListPage from "../views/user/category/CategoryListPage"
import CategoryCreatePage from "../views/user/category/CategoryCreatePage"
import CategoryEditPage from "../views/user/category/CategoryEditPage"
import CategoryTrashedPage from "../views/user/category/CategoryTrashedPage"
import MenuListPage from "../views/user/menu/MenuListPage"
import MenuCreatePage from "../views/user/menu/MenuCreatePage"
import MenuEditPage from "../views/user/menu/MenuEditPage"
import MenuTrashedPage from "../views/user/menu/MenuTrashedPage"
import LandingPage from "../views/LandingPage"
import Dashboard from "../views/user/Dashboard"
import SaleListPage from "../views/user/sale/SaleListPage"
import SaleCreatePage from "../views/user/sale/SaleCreatePage"
import SaleEditPage from "../views/user/sale/SaleEditPage"

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />


      <Route path="/menus" element={<MenuListPage />} />
      <Route path="/menus/create" element={<MenuCreatePage />} />
      <Route path="/menus/edit/:id?" element={<MenuEditPage />} />
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route path="/categories" element={<CategoryListPage />} />
      <Route path="/categories/create" element={<CategoryCreatePage />} />
      <Route path="/categories/edit/:id?" element={<CategoryEditPage />} />
      <Route path="/categories/trashed" element={<CategoryTrashedPage/>}/>
    </Route>
    
    <Route element={<ProtectedRoute />}>
      <Route path="/menus" element={<MenuListPage />} />
      <Route path="/menus/create" element={<MenuCreatePage />} />
      <Route path="/menus/edit/:id?" element={<MenuEditPage />} />
      <Route path="/menus/trashed" element={<MenuTrashedPage/>}/>
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route path="/sales" element={<SaleListPage />} />
      <Route path="/sales/create" element={<SaleCreatePage />} />
      <Route path="/sales/edit/:id?" element={<SaleEditPage />} />
    </Route>
  
   
    


  </Routes>
)
export default AppRouter