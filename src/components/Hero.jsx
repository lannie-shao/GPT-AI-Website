import React from 'react'
import logo from '../assets/logo.svg'

const Hero = () => {
  return (
    <header className='flex-row w-full justify-center items-center'>
        <nav className='flex justify-between items-center mt-3 mb-10'>
            <img src={logo} alt='sum_logo' className='w-28 object-contain'/>
            <button type='button' onClick={()=>{}} className='black_btn'>GitHub</button>
        </nav>

        <h1 className='head_text'>
            Summarize Articles with <br/>
            <span className='orange_gradient'>OpenAI GPT-4</span>
        </h1>

        <h2 className='desc'>
        Simplify your reading with Summize, an open-source article summarizer that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  )
}

export default Hero