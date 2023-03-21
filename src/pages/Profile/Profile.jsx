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
            {userProfile.credits < 0 && <p className="btn btn-outline-danger white-font"> You will need to recharge your credits before being able to use our generation tool again</p>}
            
            <br/>
            {userProfile.reviews && <h2>Reviews Generated</h2>}
            <br/>
            <div className="flex-wrap">
            {userProfile.reviews && userProfile.reviews.map((review,index)=>{
                let reviewDate = new Date(review.createdAt)
                console.log(reviewDate)
                const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            let readableUpdatedDate = reviewDate.toLocaleDateString('en-US', options)
                return <div className="card margined">
                <div className="card-body">
                    <h2 className="card-title">Name: {review.placeName}</h2> <p>Created the: {readableUpdatedDate}</p>
                    <h3 className="card-subtitle mb-2 text-muted"><span className="colored">{review.category}</span> Review</h3>
                    <p className="card-text">Notes: {review.promptNotes}</p>
                    <p>Review generated: </p>
                    <div className="margined">
                    <p className="gpt-response">{review.gptResponse}</p>
                    </div>
                    </div>
                </div>
            }) }
            </div>
        </div>
    )
}

export default Profile