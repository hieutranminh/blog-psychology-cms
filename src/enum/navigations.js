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
    id: 'testimonials',
    title: 'NAVIGATION.testimonials',
    icon: 'star',
    routeName: 'testimonials',
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
    id: 'service',
    title: 'NAVIGATION.service',
    icon: 'customer-service',
    routeName: 'service',
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
    id: 'posts',
    title: 'NAVIGATION.posts',
    icon: 'pic-left',
    routeName: 'posts',
    role: [PERMISSION.FULL_ROLE]
  },
  {
    id: 'contact',
    title: 'NAVIGATION.contact',
    icon: 'solution',
    routeName: 'contact',
    role: [PERMISSION.FULL_ROLE]
  },
  {
    id: 'tag',
    title: 'NAVIGATION.tag',
    icon: 'tags',
    routeName: 'tag',
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
