import { useEffect, useState } from "react"
import './GenerateReview.css'
import axios from "axios"
import { MutatingDots} from 'react-loader-spinner'
import { AuthContext } from "../../context/auth.context"
import { useContext } from "react"

const serverUrl = process.env.REACT_APP_SERVER_URL

function GenerateReview(){
    const { user } = useContext(AuthContext)
    const [category, setCategory] = useState('')
    const [placeName, setPlaceName] = useState('')
    const [prompt, setPrompt] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [gptResponse, setGptResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [promptTokens, setPromptTokens] = useState(0)
    const [totalTokens, setTotalTokens] = useState(0)
    const [language, setLanguage] = useState('')
    const [userCredits, setUserCredits] = useState(0)

    const updatePrompt = (e)=>{
        setPrompt(e.target.value)
        setPromptTokens((placeName.length + prompt.length +language.length) * 0.75)
        console.log("tokens in prompt", promptTokens)
        console.log("prompt length:",prompt.length)
    }

    const updatePlaceName = (e)=>{
        setPlaceName(e.target.value)
        setPromptTokens((placeName.length + prompt.length+language.length) * 0.75)
        console.log("tokens in prompt", promptTokens)
        console.log("prompt length:",prompt.length)
    }
    const languageResponse = (e)=>{
        setLanguage(e.target.value)
        setPromptTokens((placeName.length + prompt.length + language.length) * 0.75)
        console.log("tokens in prompt", promptTokens)
        console.log("prompt length:",prompt.length)
    }

    const generateReview = (e) =>{
        
        if (prompt.length > 80){
            let errorMessage = `Your prompt is currently too long with ${prompt.length} characters. Shorten it!` 
            setErrorMessage(errorMessage)
            setTimeout(()=>{
                setErrorMessage('')
            }, 2000)
            
        }
        else if (category === ''){
            let errorMessage = `Please select a category before generating your Review!` 
            setErrorMessage(errorMessage)
            setTimeout(()=>{
                setErrorMessage('')
            }, 2000)
        }
        else if (language === ''){
            let errorMessage = `Please select a language before generating your Review!` 
            setErrorMessage(errorMessage)
            setTimeout(()=>{
                setErrorMessage('')
            }, 2000)
        }
        else if (placeName === ''){
            let errorMessage = `Please indicate the name or title for your review.` 
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
        else if (userCredits < 0){
            let errorMessage = `You do not have enough credits to generate a new review! Please buy more or wait until your free monthly refill` 
            setErrorMessage(errorMessage)
            setTimeout(()=>{
                setErrorMessage('')
            }, 3500)
            
        }
        else {
            setIsLoading(true)
            axios.post(`${serverUrl}/api/review`, {prompt:'Name:' + ' ' +placeName + '.' + ' ' + prompt +'.'+` Write in ${language}`, category: category, userId: user._id})
                .then(response=>{
                    console.log(response)
                    let gptApiResponse = response.data.promptResponse.choices[0].text
                    let totalTokensUsed = response.data.promptResponse.usage.total_tokens
                    let newUserCredits = response.data.userUpdated.credits
                    setTotalTokens(totalTokensUsed)
                    setGptResponse(gptApiResponse)
                    setTimeout(()=>{
                        setUserCredits(newUserCredits)
                    },500)
                    setTimeout(()=>{
                        setIsLoading(false)
                    }, 1000)
                })
        }
    }

    useEffect(()=>{
        console.log(user)
        axios.get(`${serverUrl}/api/user/${user._id}`)
            .then(apiResponse=>{
                console.log(apiResponse)
                let userCurrentCredits = apiResponse.data.credits
                setUserCredits(userCurrentCredits)
            })
    }, [])



    return(
        <div>
        <h1>Welcome back {user.name}</h1>
        <div className="flex">
        <h3>Generate a Review for a <select onChange={(e)=>setCategory(e.target.value)}> 
            <option selected disabled>- - Choose Type - -</option>
            <option value='Restaurant'>Restaurant</option>
            <option value='Appartment'>Appartment</option>
            <option value='Retail Store'>Retail Store</option>
            <option value='Corporate Office'>Corporate Office</option>
            <option value='Company'>Company</option>
            <option value='Video'>Video</option>
        </select></h3>
        {category === '' ? <i class="bi bi-bookmark"></i> : <i class="bi bi-bookmark-check-fill"></i>}
        </div> 
            <div>
            <div className="flex">
            <label>Place Name:<input onChange={(e)=>updatePlaceName(e)}></input></label>
            {placeName === '' ? <i class="bi bi-bookmark"></i> : <i class="bi bi-bookmark-check-fill"></i>}
            </div>
            {category==='Restaurant' && <p className="italic">Ex: Georgia Restaurant</p>}
           {category==='Appartment' && <p className="italic">Ex: Studio Appartment</p>}
           {category==='Retail Store' && <p className="italic">Ex: Nike Store</p>}
           {category==='Corporate Office' && <p className="italic">Ex: Delivery postal Service</p>}
           {category==='Company' && <p className="italic">Ex: Sleever Packaging Company</p>}
           {category==='Video' && <p className="italic">Ex: Learn Web3 Programming</p>}
            <div className="flex">
           <label> Write your Notes <textarea onChange={(e)=>updatePrompt(e)}></textarea></label>
            {prompt.length < 20 ? <i class="bi bi-bookmark"></i> : <i class="bi bi-bookmark-check-fill"></i>}

           </div>
           
           {category==='Restaurant' && <p className="italic">Ex: Great Food, quiet place, a bit expensive, lovely service</p>}
           {category==='Appartment' && <p className="italic">Ex: Quiet neighborhood, fair rent, crowded space, lovely owner</p>}
           {category==='Retail Store' && <p className="italic">Ex: Rude manager, crowded, expensive, not enough products</p>}
           {category==='Corporate Office' && <p className="italic">Ex: Great service, easily accesible, parking available</p>}
           {category==='Company' && <p className="italic">Ex: Great service, parking available, main office</p>}
           {category==='Video' && <p className="italic">Ex: Accurate guide, easily understandable, good explanation, only available in english</p>}
           {promptTokens !== 0 && <p>Your prompt will approximatively use <span className="bold">{promptTokens+24}</span> tokens in your quota usage</p>}
           <div>
            <label>Language:<input onChange={(e)=>languageResponse(e)}></input></label>
            {language.length < 3 ? <i class="bi bi-bookmark"></i> : <i class="bi bi-bookmark-check-fill"></i>}
           </div>
           <button className="btn btn-outline-primary" onClick={(e)=>generateReview(e)} >Generate Review!</button>
           {errorMessage && <p className="error">{errorMessage}</p>}
           
          {!isLoading  && <div>{gptResponse && <div className="border">
                <p>{gptResponse}</p>
                <br className="bordered"/>
                {totalTokens !== 0 && <p>This Generation costed you a total of <span className="bold"> {totalTokens}</span> credits from your total Tokens quota limit</p>}
           </div>}
           </div>}
                   {userCredits>0 ? <p>Credits Remaining: {userCredits}</p> : <div>
                   <p className="alert">Credits Remaining: {userCredits}</p>
                   <p className="btn btn-outline-danger">You will not be able to generate anymore reviews until you recharge your Credits</p>
                   
                   </div>}

           {isLoading  && <div className="flex">
            <MutatingDots 
                 height="100"
                 width="100"
                 color="#4fa94d"
                 secondaryColor= '#4fa94d'
                 radius='12.5'
                 ariaLabel="mutating-dots-loading"
                 wrapperStyle={{}}
                 wrapperClass=""
                 visible={true}
                />
           </div>}
           </div>

            </div>
      
    )
}

export default GenerateReview