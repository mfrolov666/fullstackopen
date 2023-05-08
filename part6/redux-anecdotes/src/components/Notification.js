import { useSelector } from 'react-redux'


const Notification = () => {
  let notification = useSelector(({notification}) => {
      console.log(notification)
      return notification
    }
  )

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (notification === '') {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification