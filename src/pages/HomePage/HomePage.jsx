import './HomePage.css'

function HomePage(){

    return(
        <div className='margined'>
            <h1>ReviewGPT: The Fast Review Generator</h1>
            <br/>
            <div className='flex'>
                    <p className='m-bottom bold'>For your  </p>           
            <div class="typewriter">   
              <div class="text">
                <div class="wrapper">
                  <p className='ta-center'>Restaurants</p>
                  <p className='ta-center'>Appartments & Hotels</p>
                  <p className='ta-center'>Museums & Events  </p>
                </div>
              </div>
              </div>
</div>




            <h2 className='ta-left'>Capitalize on your Users</h2>
            <p >Invite your users' to leave some key-words about their feeling and emotions with your business and Quickly generate a relevant full-sentence review </p>
            <div className="flex">
                <div>
                    <h2 className='ta-left'>Boost your Users' Engagement</h2>
                    <ul>
                        <li className='ta-left'>Improve your feedback rate</li>
                        <li className='ta-left'>Leverage the power of AI with our integration of the openAI chatGPT API</li>
                        <li className='ta-left'>Convert your best users' into loyal ambasadors</li>
                        <li className='ta-left'>Boost your web visibility and reputation</li>
                        <li className='ta-left'>Obtain releveant feedback at key convertion steps</li>
                    </ul>
                </div>
                <img src='undefined'/>
            </div>
        </div>
    )
}

export default HomePage