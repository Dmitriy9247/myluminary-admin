import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiUser,
  FiCompass,
  FiGift,
  FiList,
  FiSettings,
  FiSlack,
  FiGlobe
} from 'react-icons/fi';
/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: '/dashboard', // the url
    icon: FiGrid, // icon
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/products',
    icon: FiShoppingBag,
    name: 'Products',
  },
  {
    path: '/category',
    icon: FiList,
    name: 'Category',
  },
  {
    path: '/brands',
    icon: FiGlobe,
    name: 'Brand',
  },
  {
    path: '/customers',
    icon: FiUsers,
    name: 'Customers',
  },
  {
    path: '/blogs',
    icon: FiCompass,
    name: 'Blogs',
  },
  {
    path: '/facilities',
    icon: FiGift,
    name: 'Metrc Facilities',
  },
  {
    path: '/faqs',
    icon: FiGift,
    name: 'FAQs',
  },
  {
    icon: FiSettings,
    name: 'Settings',
    routes : [
      {
        path: '/medias',
        name: 'Media'
      }
    ]
  },
  // {
  //   path: '/orders',
  //   icon: FiCompass,
  //   name: 'Orders',
  // },
  // {
  //   path: '/coupons',
  //   icon: FiGift,
  //   name: 'Coupons',
  // },
  // {
  //   path: '/our-staff',
  //   icon: FiUser,
  //   name: 'Our Staff',
  // },
  // {
  //   path: '/setting',
  //   icon: FiSettings,
  //   name: 'Setting',
  // },

  // {
  //   icon: FiSlack,
  //   name: 'Pages',
  //   routes: [
  //     // submenu

  //     {
  //       path: '/404',
  //       name: '404',
  //     },
  //     {
  //       path: '/coming-soon',
  //       name: 'Coming Soon',
  //     },
  //   ],
  // },
];

export default sidebar;
