const getStatus = (time) => {
  const curDate = new Date()
  const info = new Date(time)
  if (curDate.getDate() > info.getDate()) {
    return <p className='inline-block font-medium text-red-500'>Departed</p>
  } else if (curDate.getTime() > info.getTime()) {
    return <p className='inline-block font-medium text-red-500'>Departed</p>
  } else {
    return (
      <p className='inline-block font-medium text-green-500'>Not Departed</p>
    )
  }
}

export default getStatus
