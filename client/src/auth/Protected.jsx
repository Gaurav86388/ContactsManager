
import { useNavigate } from 'react-router-dom'
const Protected = ({children}) => {
    const navigate = useNavigate()

    const token = localStorage.getItem("jwt")

    if(!token){
        return navigate("/")
    }
    else{
        return children
    }


}

export default Protected