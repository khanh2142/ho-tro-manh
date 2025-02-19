import CategoryPage from "../pages/Category/CategoryPage";
import DepartmentPage from "../pages/Department/DepartmentPage";
import ItemPage from "../pages/Item/ItemPage";
import UserPage from "../pages/User/UserPage";

export const commonRoutes = [
  {
    path: "/user",
    component: <UserPage />,
    text: "User",
    key: "user",
  },
  {
    path: "/department",
    component: <DepartmentPage />,
    text: "Phòng ban",
    key: "department",
  },
  {
    path: "/category",
    component: <CategoryPage />,
    text: "Danh mục",
    key: "category",
  },
  {
    path: "/item",
    component: <ItemPage />,
    text: "Hạng mục",
    key: "item",
  },
];
