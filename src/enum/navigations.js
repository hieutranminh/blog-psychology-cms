import { PERMISSION } from '@/enum/permission'

export const NAVIGATIONS = [
  {
    id: 'home',
    title: 'NAVIGATION.home',
    icon: 'home',
    routeName: 'home',
    role: [PERMISSION.FULL_ROLE]
  },
  {
    id: 'story',
    title: 'NAVIGATION.story',
    icon: 'bulb',
    routeName: 'story',
    role: [PERMISSION.FULL_ROLE]
  },
  {
    id: 'team',
    title: 'NAVIGATION.team',
    icon: 'team',
    routeName: 'team',
    role: [PERMISSION.FULL_ROLE]
  },
  {
    id: 'knowledge',
    title: 'NAVIGATION.knowledge',
    icon: 'book',
    routeName: 'knowledge',
    role: [PERMISSION.FULL_ROLE]
  },
  {
    id: 'news',
    title: 'NAVIGATION.news',
    icon: 'pic-left',
    routeName: 'news',
    role: [PERMISSION.FULL_ROLE]
  },
  {
    id: 'admin',
    title: 'NAVIGATION.admin',
    icon: 'user',
    routeName: 'admin',
    role: [PERMISSION.FULL_ROLE]
  }
]
