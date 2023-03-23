import { useEffect, useState } from "react"
import axios from "axios"
import { MutatingDots } from "react-loader-spinner"
import './UsersLeaderboard.css'

const serverUrl = process.env.REACT_APP_SERVER_URL

function UsersLeaderboard(){

    const [users,setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        axios.get(`${serverUrl}/api/user`)
        .then(response=>{
            console.log(response.data.users)
            const users = response.data.users
            users.sort((a,b)=>{
                return b.reviews.length - a.reviews.length
            })
            setUsers(users)
            setTimeout(()=>{
                setIsLoading(false)
            },1000)
        })
    }, [])

    return(
        <div>
        {isLoading ? <div className="flex-centered"><MutatingDots 
                 height="100"
                 width="100"
                 color="#ff7f50"
                 secondaryColor= '#adff2f'
                 radius='12.5'
                 ariaLabel="mutating-dots-loading"
                 wrapperStyle={{}}
                 wrapperClass="margin-auto"
                 visible={true}
                /> </div> :
                 <div>
                    <table className="margin-auto">
                        <thead>
                            <tr>
                                <td>Ranking</td>
                                <td>User</td>
                                <td>Reviews Created</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user,index)=>{
                                return <tr>
                                    <td>{index+1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.reviews.length}</td>
                                    <td>{user.userStatus}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                 }

        </div>
    )
}

export default UsersLeaderboard