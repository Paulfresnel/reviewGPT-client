import './HomePage.css'

function HomePage(){

    return(
        <div className='margined'>
            <h1 className='line-break'><span className='colored'>ReviewGPT</span><br/> The Fast Review Generator</h1>
            <br/>
            <div className='flex-centered'>
                    <p className='m-bottom bold align-items'>For your  </p>           
            <div class="typewriter">   
              <div class="text">
                <div class="wrapper">
                  <p className='ta-center'>Restaurants &  Bars</p>
                  <p className='ta-center'>Appartments & Hotels</p>
                  <p className='ta-center'>Museums & Events  </p>
                </div>
              </div>
              </div>
</div>

        <div className='centered-div'>
            <h2 className='ta-left margin-bottom-plus'>Leverage the power of <br/><span className='colored bold big-font'>Chat GPT</span></h2>
            <p className='margin-bottom-inter'>Access the openAI chatGPT API to quickly generate a variety of unique reviews based on
            short inputs. Save time and energy to build your perfect review!</p>
        </div>


        <div className='centered-div'>
            <h2 className='ta-left margin-bottom-plus'>Capitalize on your Users</h2>
            <p className='margin-bottom-inter m-left-0 ta-left'>Invite your users' to leave some key-words about their feeling and emotions with your business and Quickly generate a relevant full-sentence review </p>
        </div>
            <div className="flex-responsive">
                <div>
                    <h2 className='ta-left margin-bottom-plus'>Boost your Users' Engagement</h2>
                    <ul>
                        <li className='ta-left'>Improve your feedback rate</li>
                        <li className='ta-left'>Leverage the power of AI with our integration of the openAI chatGPT API</li>
                        <li className='ta-left'>Convert your best users' into loyal ambasadors</li>
                        <li className='ta-left'>Boost your web visibility and reputation</li>
                        <li className='ta-left'>Obtain releveant feedback at key convertion steps</li>
                    </ul>
                </div>
                <img className='margin-bottom-inter menu-img' src='/images/robot-ai.png'/>
            </div>
        </div>
    )
}

export default HomePage