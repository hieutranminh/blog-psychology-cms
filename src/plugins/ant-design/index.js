import Vue from 'vue'
import 'ant-design-vue/dist/antd.css'
import {
  Input,
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Collapse,
  Checkbox,
  Select,
  Button,
  Dropdown,
  Row,
  Col,
  Table,
  Popconfirm,
  Tag,
  Spin,
  notification,
  message,
  Radio,
  Pagination,
  Card,
  Switch,
  Rate,
  Tooltip
} from 'ant-design-vue'

// import components
Vue.use(Input)
Vue.use(Collapse)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Breadcrumb)
Vue.use(Layout)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(Popconfirm)
Vue.use(Tag)
Vue.use(Spin)
Vue.use(Radio)
Vue.use(Pagination)
Vue.use(Card)
Vue.use(Switch)
Vue.use(Rate)
Vue.use(Tooltip)
Vue.prototype.$notification = notification
Vue.prototype.$message = message
