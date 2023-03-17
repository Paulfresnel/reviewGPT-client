import { useState } from "react"
import './GenerateReview.css'
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL

function GenerateReview(){
    const [category, setCategory] = useState('')
    const [placeName, setPlaceName] = useState('')
    const [prompt, setPrompt] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [gptResponse, setGptResponse] = useState('')

    const generateReview = (e) =>{
        console.log(prompt.length)
        if (prompt.length > 75){
            let errorMessage = `Your prompt is currently too long with ${prompt.length} characters. Shorten it!` 
            setErrorMessage(errorMessage)
            setTimeout(()=>{
                setErrorMessage('')
            }, 2000)
        }
        else if (prompt.length < 20){
            let errorMessage = `Your prompt is too short! Your prompt must have at least 20 characters for an optimized generation` 
            setErrorMessage(errorMessage)
            setTimeout(()=>{
                setErrorMessage('')
            }, 2000)
        }
        else {
            axios.post(`${serverUrl}/api/review`, {prompt:placeName + '.' + ' ' + prompt, category: category})
                .then(response=>{
                    console.log(response)
                    let gptApiResponse = response.data.choices[0].text
                    setGptResponse(gptApiResponse)
                })
        }
    }

    return(
        <div>
        <h1>Generate a Review for a <select onChange={(e)=>setCategory(e.target.value)}>
            <option selected disabled>- - Choose Type - -</option>
            <option value='Restaurant'>Restaurant</option>
            <option value='Appartment'>Appartment</option>
            <option value='Retail Store'>Retail Store</option>
            <option value='Corporate Office'>Corporate Office</option>
            <option value='Company'>Company</option>
            <option value='Video'>Video</option>
        </select></h1>
            <div>
            <label>Place Name:<input onChange={(e)=>setPlaceName(e.target.value)}></input></label>
           <label> Write your Notes <textarea onChange={(e)=>setPrompt(e.target.value)}></textarea></label>
           <button onClick={(e)=>generateReview(e)} >Generate Review!</button>
           {errorMessage && <p className="error">{errorMessage}</p>}
           {category==='Restaurant' && <p className="italic">Ex: Great Food, quiet place, a bit expensive, lovely service</p>}
           {category==='Appartment' && <p className="italic">Ex: Quiet neighborhood, fair rent, crowded space, lovely owner</p>}
           {category==='Retail Store' && <p className="italic">Ex: Rude manager, crowded, expensive, not enough products</p>}
           {category==='Corporate Office' && <p className="italic">Ex: Great service, easily accesible, parking available</p>}
           {category==='Company' && <p className="italic">Ex: Great service, parking available, main office</p>}
           {category==='Video' && <p className="italic">Ex: Accurate guide, easily understandable, good explanation, only available in english</p>}
           {gptResponse && <div className="border">
                <p>{gptResponse}</p>
           </div>}

            </div>
        </div>
    )
}

export default GenerateReview