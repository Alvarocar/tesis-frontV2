import { useRouteError } from "react-router-dom"

const Error = () => {
  
  const error = useRouteError();
  
  console.error(error)
  return <div>hubo un error</div>
}

export default Error