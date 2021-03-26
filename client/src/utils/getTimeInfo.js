const getTimeInfo = (time) => {
  const info = new Date(time).toString().split(' ')
  return info
    .filter((value, idx) => idx < 5)
    .map((i, index) => {
      if (i.includes(':')) {
        return (
          <p
            className='inline-block font-medium pr-1 text-green-400'
            key={index}
          >
            {i}
          </p>
        )
      }
      return (
        <p className='inline-block font-medium pr-1' key={index}>
          {i}
        </p>
      )
    })
}

export default getTimeInfo
