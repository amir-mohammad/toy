
import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "./components/DashboardPage";
import Oreders from "./components/Oreders";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import Product from "./components/Product";
import Customer from "./components/Customer";
import Category from "./components/Category";
import Addproduct from "./components/Addproduct";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: Dashboard,
    component: DashboardPage,
    page: "/admin",
    show:true
  },
  {
    path: "/category",
    name: "Category",
    icon: CategoryOutlinedIcon,
    component: Category,
    page: "/admin",
    show:true

  },
  {
    path: "/oreders",
    name: "Oreders",
    icon: AssignmentOutlinedIcon,
    component: Oreders,
    page: "/admin",
    show:true
  },
  {
    path: "/product",
    name: "Product",
    icon: InboxOutlinedIcon,
    component: Product,
    page: "/admin",
    show:true
  },{
    path: "/customers",
    name: "Customers",
    icon: InboxOutlinedIcon,
    component: Customer,
    page: "/admin",
    show:true
  },
  {
    path: "/addproduct",
    name: "AddProduct",
    icon: InboxOutlinedIcon,
    component: Addproduct,
    page: "/admin",
    show:false
  }
];

export default dashboardRoutes;
