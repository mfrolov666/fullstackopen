import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notification(state, action) {
      return action.payload
    },
    notificationRemove(state, action) {
      return ''
    }
  }

})

export const { notification, notificationRemove } = notificationSlice.actions

export const setNotification = (text, timeout) => {
  return async dispatch => {
    dispatch(notification(text)); 
    setTimeout(() => {dispatch(notificationRemove())},timeout*1000)}
  }

export default notificationSlice.reducer