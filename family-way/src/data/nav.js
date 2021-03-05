import shortid from 'shortid'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import AttachmentRoundedIcon from '@material-ui/icons/AttachmentRounded'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import GroupIcon from '@material-ui/icons/Group'
import QueueIcon from '@material-ui/icons/Queue'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import ListAltIcon from '@material-ui/icons/ListAlt'
import TimerIcon from '@material-ui/icons/Timer'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import AddIcon from '@material-ui/icons/Add'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import ViewWeekIcon from '@material-ui/icons/ViewWeek'
import DialpadIcon from '@material-ui/icons/Dialpad'
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import EmailIcon from '@material-ui/icons/Email';
export default {
  catagiories: [
    {
      title: 'اضافه الاصناف',
      icon: AddCircleRoundedIcon,
      to: '/',
      id: shortid.generate()
    }
  ],
  getsubcagtiories: [
    {
      title: ' الاصناف الفرعيه',
      icon: AttachmentRoundedIcon,
      to: '/Getsubcatagiories',
      id: shortid.generate()
    }
  ],
  thirdcagtiories: [
    {
      title: ' الاصناف الثالثه',
      icon: AcUnitIcon,
      to: '/Getthirdcatagiories',
      id: shortid.generate()
    }
  ],
  users: [
    {
      title: ' المستخدمين ',
      icon: GroupIcon,
      to: '/users',
      id: shortid.generate()
    }
  ],
  notifcations: [
    {
      title: ' ارسال الأشعارات ',
      icon: NotificationImportantIcon,
      to: '/pushNot',
      id: shortid.generate()
    }
  ],
  addproducts: [
    {
      title: ' اضافه منتجات ',
      icon: QueueIcon,
      to: '/addproducts',
      id: shortid.generate()
    }
  ],
  getproducts: [
    {
      title: ' عرض منتجات ',
      icon: ShoppingBasketIcon,
      to: '/Getproducts',
      id: shortid.generate()
    }
  ],
  constants: [
    {
      title: 'صفحه الثوابت ',
      icon: ListAltIcon,
      to: '/constants',
      id: shortid.generate()
    }
  ],
  ordertimes: [
    {
      title: 'صفحه اوقات الطلبات ',
      icon: TimerIcon,
      to: '/ordertimes',
      id: shortid.generate()
    }
  ],
  orders: [
    {
      title: ' عرض الطلبات ',
      icon: ShoppingCartIcon,
      to: '/orders',
      id: shortid.generate()
    }
  ],
  ordersArchived: [
    {
      title: ' الطلبات المأرشفه ',
      icon: ShoppingCartIcon,
      to: '/orders-archived',
      id: shortid.generate()
    }
  ],
  addcoupons: [
    {
      title: ' انشاء الكوبونات ',
      icon: AddIcon,
      to: '/create-coupons',
      id: shortid.generate()
    }
  ],
  getcoupons: [
    {
      title: ' عرض الكوبونات ',
      icon: LibraryAddCheckIcon,
      to: '/view-coupons',
      id: shortid.generate()
    }
  ],
  addslider: [
    {
      title: ' انشاء السلايدر ',
      icon: AddRoundedIcon,
      to: '/add-slider',
      id: shortid.generate()
    }
  ],
  getslider: [
    {
      title: ' عرض السلايدر ',
      icon: ViewWeekIcon,
      to: '/sliders-view',
      id: shortid.generate()
    }
  ],
  addslidercatagories: [
    {
      title: ' انشاء السلايدر الاصناف الثالثه',
      icon: AddRoundedIcon,
      to: '/add-slider-catagories',
      id: shortid.generate()
    }
  ],
  getslidercatagories: [
    {
      title: '  السلايدر الاصناف الثالثه',
      icon: ViewWeekIcon,
      to: '/sliders-catagories-view',
      id: shortid.generate()
    }
  ],
  Ads: [
    {
      title: ' الاعلانات ',
      icon: DialpadIcon,
      to: '/ads',
      id: shortid.generate()
    }
  ],
  Additations : [{
    title: ' الاضافات ',
      icon: AddBoxSharpIcon,
      to: '/additations',
      id: shortid.generate()
  }],
  emails : [{
    title: ' البريد ',
      icon: EmailIcon,
      to: '/emails',
      id: shortid.generate()
  }]
}
