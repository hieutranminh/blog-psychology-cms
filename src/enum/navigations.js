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
    id: 'team',
    title: 'NAVIGATION.team',
    icon: 'pic-left',
    role: [PERMISSION.FULL_ROLE],
    dropdownItems: [
      {
        id: 'team_overview',
        title: 'NAVIGATION.team_overview',
        routeName: 'team.overview',
        role: [PERMISSION.FULL_ROLE]
      }
    ]
  },
  {
    id: 'news',
    title: 'NAVIGATION.news',
    icon: 'pic-left',
    routeName: 'news',
    role: [PERMISSION.FULL_ROLE]
  },
  {
    id: 'user',
    title: 'NAVIGATION.user',
    icon: 'team',
    routeName: 'user',
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
