import { useEffect, useState } from "react"
import './GenerateReview.css'
import axios from "axios"
import { MutatingDots} from 'react-loader-spinner'
import { AuthContext } from "../../context/auth.context"
import { useContext } from "react"
import ClipboardJS from "clipboard"

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

      const copied = (e)=>{
        const element = e.target
        element.className = "btn copy-btn2 bi bi-clipboard2-check-fill green-color"
        setTimeout(()=>{
            element.className = "btn copy-btn2 bi bi-clipboard2-check white-color"
        },550)
    }


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
        
        if (userCredits < 0){
            let errorMessage = `You do not have enough credits to generate a new review! Please buy more or wait until your free monthly refill` 
            setErrorMessage(errorMessage)
            setTimeout(()=>{
                setErrorMessage('')
            }, 3500)
            
        }
        
        else if (prompt.length > 80){
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
        
        else if (language.length < 3){
            let errorMessage = `Please select a language before generating your Review!` 
            setErrorMessage(errorMessage)
            setTimeout(()=>{
                setErrorMessage('')
            }, 2000)
        }
        else {
            setIsLoading(true)
            axios.post(`${serverUrl}/api/review`, {category: category, userId: user._id, placeName, language, promptNotes: prompt})
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
        const clipboard = new ClipboardJS('.btn');
        console.log(user)
        axios.get(`${serverUrl}/api/user/${user._id}`)
            .then(apiResponse=>{
                console.log(apiResponse)
                let userCurrentCredits = apiResponse.data.credits
                setUserCredits(userCurrentCredits)
            })
    }, [])



    return(
        <div className="flex-c margined">
        <h1 className="margin-top"> Hi <strong className="colored-highlighted">{user.name}</strong>, ready to quickly generate a review?</h1>
        <p> Make sure all flags <i class="bi bi-bookmark"></i> are checked <i class="bi bi-bookmark-check-fill"></i> to generate your review </p>
        <div className="div-block2"/>
        <div className="flex">
        <h4 className="btn btn-primary spaced">1</h4>
        <h3>Generate a Review for a <select onChange={(e)=>setCategory(e.target.value)}> 
            <option selected disabled>- - Choose Type - -</option>
            <option value='Restaurant'>Restaurant</option>
            <option value='Bar'>Bar</option>
            <option value='Hotel'>Hotel</option>
            <option value='Appartment'>Appartment</option>
            <option value='Retail Store'>Retail Store</option>
            <option value='Corporate Office'>Corporate Office</option>
            <option value='Company'>Company</option>
            <option value='Video'>Video</option>
            <option value='Event'>Event</option>
            <option value='Museum'>Museum</option>
            <option value='Gym'>Gym</option>



        </select></h3>
        {category === '' ? <i class="bi bi-bookmark"></i> : <i class="bi bi-bookmark-check-fill"></i>}
        </div> 
            <div className="margin-bottom">
            <div className="flex">
            <h4 className="btn btn-primary spaced">2</h4>
            <label>Place Name:<input onChange={(e)=>updatePlaceName(e)}></input></label>
            {placeName === '' ? <i class="bi bi-bookmark"></i> : <i class="bi bi-bookmark-check-fill"></i>}
            </div>
            {category==='Restaurant' && <p className="italic">Ex: Georgia Restaurant</p>}
            {category==='Event' && <p className="italic">Ex: Music Festival/ Paint Exposition</p>}
            {category==='Gym' && <p className="italic">Ex: Fit Gym Madrid</p>}
            {category==='Bar' && <p className="italic">Ex: Café Oz</p>}
            {category==='Hotel' && <p className="italic">Ex: NH Hotels</p>}
            {category==='Museum' && <p className="italic">Ex: The Louvre</p>}
            {category==='Appartment' && <p className="italic">Ex: Studio Appartment</p>}
            {category==='Retail Store' && <p className="italic">Ex: Nike Store</p>}
           {category==='Corporate Office' && <p className="italic">Ex: Delivery postal Service</p>}
           {category==='Company' && <p className="italic">Ex: Sleever Packaging Company</p>}
           {category==='Video' && <p className="italic">Ex: Learn Web3 Programming</p>}
            <div className="flex justify no-padding-bottom">
            <h4 className="btn btn-primary spaced fixed-h">3</h4>
           <label className="flex justify"> Write your Notes <textarea onChange={(e)=>updatePrompt(e)}></textarea></label>
            {prompt.length < 20 ? <i class="bi bi-bookmark"></i> : <i class="bi bi-bookmark-check-fill"></i>}

           </div>
           <div className="no-margin-top">
           {category==='Restaurant' && <p className="italic">Ex: Great Food, quiet place, a bit expensive, lovely service</p>}
           {category==='Bar' && <p className="italic">Ex: Great Beer, lovely atmostphere, bit expensive, friendly staff</p>}
           {category==='Museum' && <p className="italic">Ex: Great diversity of art, quiet and calm atmostphere, cheap entry</p>}
           {category==='Gym' && <p className="italic">Ex: Cheap subscription plans, great quality material, spacious, friendly staff</p>}
           {category==='Event' && <p className="italic">Ex: Great sound system, security in place, too crowded, best techno music</p>}
           {category==='Hotel' && <p className="italic">Ex: Great Food service, cheap, spacious rooms, friendly staff</p>}
           {category==='Appartment' && <p className="italic">Ex: Quiet neighborhood, fair rent, crowded space, lovely owner</p>}
           {category==='Retail Store' && <p className="italic">Ex: Rude manager, crowded, expensive, not enough products</p>}
           {category==='Corporate Office' && <p className="italic">Ex: Great service, easily accesible, parking available</p>}
           {category==='Company' && <p className="italic">Ex: Great service, parking available, main office</p>}
           {category==='Video' && <p className="italic">Ex: Accurate guide, easily understandable, good explanation, only available in english</p>}
           {promptTokens !== 0 && <p>This request will approximately cost you a total of <span className="bold">{promptTokens+70}</span> credits in your quota usage</p>}

           </div>
           <div>
           <h4 className="btn btn-primary spaced">4</h4>
            <label>Language:<input className="short" onChange={(e)=>languageResponse(e)}></input></label>
            {language.length < 3 ? <i class="bi bi-bookmark"></i> : <i class="bi bi-bookmark-check-fill"></i>}
           </div>
           <p className="italic">Ex: French</p>
           {(category !== '' && placeName.length >= 3 && language.length >= 3 && prompt.length >= 20)? <button className="btn btn-outline-primary generate-btn-valid" onClick={(e)=>generateReview(e)} >Generate Review!</button> : <button className="btn btn-outline-primary generate-btn-invalid" onClick={(e)=>generateReview(e)} >Generate Review</button>}
           {errorMessage && <p className="error">{errorMessage}</p>}
           
          {!isLoading  && <div className="margin-0-auto">{gptResponse && <div className="border">
                 <i onClick={(e)=>copied(e)} data-clipboard-text={gptResponse} className="btn ta-right copy-btn2 bi bi-clipboard2-check white-color"></i>
                <p id="gpt-response">{gptResponse}</p>
                <br className="bordered"/>
                <div className="div-block"/>
                {totalTokens !== 0 && <p>This Generation costed you a total of <span className="bold"> {totalTokens}</span> credits from your total Tokens quota limit</p>}
           </div>}
           </div>}
           <div className="div-block2"/>
                   {userCredits>0 ? <p>Credits Remaining: {userCredits}</p> : <div className="margin-bottom">
                   <p className="alert">Credits Remaining: {userCredits}</p>
                   <p className="btn btn-outline-danger white-font">You will not be able to generate anymore reviews until you recharge your Credits</p>
                   
                   </div>}

           {isLoading  && <div className="flex margin-bottom">
            <MutatingDots 
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
           </div>

            </div>
      
    )
}

export default GenerateReview