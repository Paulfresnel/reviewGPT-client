import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import './Profile.css'
import ClipboardJS from "clipboard"
import { MutatingDots } from "react-loader-spinner"
import { Link } from "react-router-dom"

const serverUrl = process.env.REACT_APP_SERVER_URL

function Profile(){
    
    const [userProfile, setUserProfile] = useState({})
    const {user} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)

    const copied = (e)=>{
        console.log(e.target)
        const element = e.target
        console.log(element.className)
        element.className = "btn copy-btn bi bi-clipboard2-check-fill black-color"
        setTimeout(()=>{
            element.className = "btn copy-btn bi bi-clipboard2-check black-color"
        },550)
    }

    useEffect(()=>{
          const clipboard = new ClipboardJS('.btn');
        axios.get(`${serverUrl}/api/user/${user._id}`)
            .then(response=>{
                let userInfo = response.data
                setUserProfile(userInfo)
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)

            })
    }, [])

    return(
        <div>
        {isLoading && <div className="flex-centered"><MutatingDots 
                 height="100"
                 width="100"
                 color="#ff7f50"
                 secondaryColor= '#adff2f'
                 radius='12.5'
                 ariaLabel="mutating-dots-loading"
                 wrapperStyle={{}}
                 wrapperClass=""
                 visible={true}
                />
                </div>}


            {!isLoading && <div>
            <div className="flex">
                <h1>Welcome <strong className="colored-highlighted">{userProfile.user}</strong> </h1> {userProfile.userStatus === 'premium' && <span class="badge bg-warning new-badge"> Premium </span>}
            </div>
            <div className="div-block2"/>
            <p>Total Credits Left: {userProfile.credits}</p>
            {userProfile.credits < 0 && <p className="btn btn-outline-danger danger-font"> You will need to recharge your credits before being able to use our generation tool again</p>}
            
            <br/>
            {userProfile.reviews.length !== 0 ? <h2>Reviews Generated</h2> :  <div> <div className="div-block2"/><p>You have not yet generated any review!</p>
            <Link to={'/generate-review'}>
            <button className="btn btn-outline-success btn-generate">Generate a Review</button>
            </Link>
            </div>}
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
                    <h2 className="card-title">Name: {review.placeName}</h2> <p>Created on <span className="bold">{readableUpdatedDate}</span></p>
                    <h3 className="card-subtitle mb-2 text-muted"><span className="colored">{review.category}</span> Review</h3>
                    <div className="div-block"/>
                    <p className="card-text">Notes: {review.promptNotes}</p>
                    <p>Review generated: </p>
                    <div className="background-color">
                    
                    <p className="gpt-response">
                         <i onClick={(e)=>copied(e)} data-clipboard-text={review.gptResponse} className="btn ta-right copy-btn bi bi-clipboard2-check black-color"></i>
                    <br/>{review.gptResponse}</p>
                    </div>
                    </div>
                </div>
            }) }
            </div>
        </div>
        } </div>
    )
}

export default Profile