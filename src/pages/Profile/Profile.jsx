import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import './Profile.css'

const serverUrl = process.env.REACT_APP_SERVER_URL

function Profile(){
    const [userProfile, setUserProfile] = useState({})
    const {user} = useContext(AuthContext)

    useEffect(()=>{
        axios.get(`${serverUrl}/api/user/${user._id}`)
            .then(response=>{
                let userInfo = response.data
                setUserProfile(userInfo)
            })
    }, [])

    return(
        <div>
            <div className="flex">
                <h1>Welcome {userProfile.user}</h1> {userProfile.userStatus === 'premium' && <span class="badge bg-warning new-badge">Premium</span>}
            </div>
            <p>Total Credits Left: {userProfile.credits}</p>
            {userProfile.credits < 0 && <p className="btn btn-outline-danger"> You will need to recharge your credits before being able to use our generation tool again</p>}
            
            <br/>
            <h2>Reviews Generated</h2>
            <br/>
            {userProfile.reviews && userProfile.reviews.map((review,index)=>{
                return <div className="card margined">
                    <h2>Name: {review.placeName}</h2>
                    <br/>
                    <h3><span className="colored">{review.category}</span> Review</h3>
                    <p>Notes: {review.promptNotes}</p>
                    <br/>
                    <p>Review generated: </p>
                    <div className="card margined">
                    <p>{review.gptResponse}</p>
                    </div>
                </div>
            }) }
        </div>
    )
}

export default Profile