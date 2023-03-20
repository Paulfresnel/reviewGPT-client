import axios from "axios"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"

const serverUrl = process.env.REACT_APP_SERVER_URL

function Profile(){

    const {user} = useContext(AuthContext)

    useEffect(()=>{
        axios.get(`${serverUrl}/api/user/${user._id}`)
            .then(response=>{
                console.log("user info: " + response)
            })
    }, [])

    return(
        <div>

        </div>
    )
}

export default Profile