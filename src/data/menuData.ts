import { MenuDataItem } from '@/layout/component/aside/menuData'
import { MenuDataTypeEnum } from '@/enum/settingsEnum'

export const menuData: MenuDataItem[] = [
  {
    id: '1',
    menuName: 'Home',
    menuPath: '/welcome/index',
    icon: 'fluent-color:home-48',
    type: 0,
    keepAlive: false,
    transition: '',
    children: [],
    parentId: -1
  },
  {
    id: '11',
    menuName: '组件',
    menuPath: 'Layout',
    icon: 'logos:vue',
    type: 0,
    keepAlive: false,
    transition: '',
    parentId: -1,
    children: [
      {
        id: '13',
        menuName: '表单',
        menuPath: '/component/form/FormView',
        icon: 'lets-icons:form-duotone',
        type: 0,
        keepAlive: false,
        transition: '',
        children: [],
        parentId: 2
      },
      {
        id: '14',
        menuName: '表格',
        menuPath: '/component/table/TableView',
        icon: 'ci:table',
        type: 0,
        keepAlive: false,
        transition: '',
        children: []
      },
      {
        id: '15',
        menuName: '弹窗',
        menuPath: '/component/dialog/DialogView',
        icon: 'entypo:popup',
        type: 0,
        keepAlive: false,
        transition: '',
        children: []
      }
    ]
  },
  {
    id: '2',
    menuName: '系统管理',
    menuPath: 'Layout',
    icon: 'unjs:c12',
    type: 0,
    keepAlive: false,
    transition: '',
    parentId: -1,
    children: [
      {
        id: '3',
        menuName: '菜单管理',
        menuPath: '/sys/menu/index',
        icon: 'ic:twotone-menu',
        type: 0,
        keepAlive: false,
        transition: '',
        children: [],
        parentId: 2
      },
      {
        id: '4',
        menuName: '角色管理',
        menuPath: '/sys/role/index',
        icon: 'icon-park-outline:permissions',
        type: 0,
        keepAlive: false,
        transition: '',
        children: []
      },
      {
        id: '5',
        menuName: '用户管理',
        menuPath: '/sys/user/index',
        icon: 'mynaui:book-user-solid',
        type: 0,
        keepAlive: false,
        transition: '',
        children: []
      }
    ]
  }
]
