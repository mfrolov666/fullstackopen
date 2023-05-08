import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationVote(state, action) {
      return `you voted "${action.payload}"`
    },
    notificationAdd(state, action) {
      return `you added "${action.payload}"`
    },
    notificationRemove(state, action) {
      return ''
    }
  }

})

export const { notificationAdd, notificationVote, notificationRemove } = notificationSlice.actions
export default notificationSlice.reducer