import Vue from 'vue'
import 'ant-design-vue/dist/antd.css'
import {
  Input,
  InputNumber,
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Collapse,
  Checkbox,
  Select,
  Button,
  DatePicker,
  Dropdown,
  Row,
  Col,
  Table,
  Popconfirm,
  Tag,
  Switch,
  Spin,
  notification,
  message,
  Rate,
  Radio,
  Pagination,
  Tabs,
  Card,
  Statistic
} from 'ant-design-vue'

// import components
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Collapse)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Breadcrumb)
Vue.use(Layout)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(Dropdown)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(Popconfirm)
Vue.use(Tag)
Vue.use(Switch)
Vue.use(Spin)
Vue.use(Rate)
Vue.use(Radio)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(Card)
Vue.use(Statistic)
Vue.prototype.$notification = notification
Vue.prototype.$message = message
