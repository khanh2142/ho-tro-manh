import CategoryPage from "../pages/common/Category/CategoryPage";
import DepartmentPage from "../pages/common/Department/DepartmentPage";
import ItemPage from "../pages/common/Item/ItemPage";
import UserPage from "../pages/common/User/UserPage";

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
