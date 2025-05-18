"use client"

const Error = ({error}) => {
  return (
    <>
      <p>Someting went Wrong:{error.message}</p>
    </>
  )
}

export default Error