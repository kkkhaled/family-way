import shortid from "shortid";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import AttachmentRoundedIcon from "@material-ui/icons/AttachmentRounded";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import GroupIcon from "@material-ui/icons/Group";
import QueueIcon from "@material-ui/icons/Queue";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ListAltIcon from "@material-ui/icons/ListAlt";
import TimerIcon from "@material-ui/icons/Timer";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

export default {
  catagiories: [
    {
      title: "اضافه الاصناف",
      icon: AddCircleRoundedIcon,
      to: "/Addcatagiories",
      id: shortid.generate(),
    },
  ],
  getsubcagtiories: [
    {
      title: " الاصناف الفرعيه",
      icon: AttachmentRoundedIcon,
      to: "/Getsubcatagiories",
      id: shortid.generate(),
    },
  ],
  thirdcagtiories: [
    {
      title: " الاصناف الثالثه",
      icon: AcUnitIcon,
      to: "/Getthirdcatagiories",
      id: shortid.generate(),
    },
  ],
  users: [
    {
      title: " المستخدمين ",
      icon: GroupIcon,
      to: "/users",
      id: shortid.generate(),
    },
  ],
  notifcations: [
    {
      title: " ارسال الأشعارات ",
      icon: NotificationImportantIcon,
      to: "/pushNot",
      id: shortid.generate(),
    },
  ],
  addproducts: [
    {
      title: " اضافه منتجات ",
      icon: QueueIcon,
      to: "/addproducts",
      id: shortid.generate(),
    },
  ],
  getproducts: [
    {
      title: " عرض منتجات ",
      icon: ShoppingBasketIcon,
      to: "/Getproducts",
      id: shortid.generate(),
    },
  ],
  constants: [
    {
      title: "صفحه الثوابت ",
      icon: ListAltIcon,
      to: "/constants",
      id: shortid.generate(),
    },
  ],
  ordertimes: [
    {
      title: "صفحه اوقات الطلبات ",
      icon: TimerIcon,
      to: "/ordertimes",
      id: shortid.generate(),
    },
  ],
  orders: [
    {
      title: "صفحه عرض الطلبات ",
      icon: ShoppingCartIcon,
      to: "/orders",
      id: shortid.generate(),
    },
  ],
};
