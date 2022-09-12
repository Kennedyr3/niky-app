import { API } from '..'

export default {

  async timelineList() {
    try {
      const user = await localStorage.getItem('user')
      const id = JSON.parse(user)
      const headers = await myHeaders()

      const response = await API.get(`https://fake-saver.herokuapp.com/items`, { headers })
      return response
    } catch (error) {
      console.log('timelineList', error)
      return null
    }
  },
}
