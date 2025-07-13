import React from 'react';
import ReactDOM from 'react-dom/client';
import './footer.css';


function Footer() { 
    return (
        <footer>
            <div className='userName'>
                    <h1>Yousif Hibi</h1>
            </div>
            <div className='redirectionButtons bottum'>
                <div className='gitHub linkBtn'>
                    <button><img src="/github-mark.png" width={30} height={30}></img></button>
                </div>
                <div className='linkedin linkBtn'>
                    <button><img src="/linkedin.png" width={30} height={30}></img></button>
                </div>
                <div className='email linkBtn'>
                    <button><img src="/gmail.png" width={30} height={30}></img></button>
                </div>
            </div>
        </footer>


    );
   


}

export default Footer;