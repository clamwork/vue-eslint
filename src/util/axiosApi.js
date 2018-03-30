import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

axios.defaults.baseURL = '/djwmsservice'
axios.interceptors.response.use((res) => {
  if (!res.data.success) {
    if (res.data.code === 880004) {
      MessageBox.alert('请先登录', {
        confirmButtonText: '确定'
      }).then(() => {
        location.href = res.data.data
        sessionStorage.clear()
      }).catch(() => {
        location.href = res.data.data
        sessionStorage.clear()
      })
    } else {
      Message.error(res.data.msg)
    }
  }
  return res
})
export default axios
