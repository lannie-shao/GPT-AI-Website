import {useEffect, useState} from 'react'
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setArticle] = useState({
    summary:"",
    url:""
  })

  const [getSummary,{error,isFetching}]=useLazyGetSummaryQuery();
  const [historyArticles, setHistoryArticles] = useState([])
  const [copied, setCopied] = useState("")

  const handleCopy=(copyUrl)=>{
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(()=>setCopied(''),3000)
  }
  useEffect(()=>{
    const articleFromLocalStorage=JSON.parse(window.localStorage.getItem('article'))
    if(articleFromLocalStorage){
      setHistoryArticles(articleFromLocalStorage)
    }
  },[])
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {data}=await getSummary({articleUrl:article.url})
    if(data?.summary){
      const newArticle={...article,summary:data.summary}
      const updatedArticles=[newArticle,...historyArticles]
      setHistoryArticles(updatedArticles)
      setArticle(newArticle)

      window.localStorage.setItem('article',JSON.stringify(updatedArticles))
    }

  }
  return (
    <section className='w-full mt-16 max-w-xl'>
      <div className=''>
        <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
          <img src={linkIcon} alt='link-icon' className='absolute left-0 my-2 ml-3 w-5'/>
          <input type='url' placeholder='Enter a URL' value={article.url} onChange={(e)=>setArticle({...article,url:e.target.value})}
          required className='url_input peer'/>
          <button className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700' type='submit'> <p>↵</p></button>
        </form>

        <div className='flex-col'>
          {historyArticles.map((article,index)=>(
            <div key={`link-${index}`} onClick={()=>setArticle(article)}
              className='link_card'>
              <div className='copy_btn' onClick={()=>handleCopy(article.url)}>
                <img src={copied===article.url?tick:copy} alt='copy_icon' />
              </div>
              <p className='text-blue-700 font-satoshi font-medium text-sm truncate'>
               {article.url}
              </p>
            </div>
          ))}
        </div>

        <div className='flex my-10 max-w-full justify-center items-center'>
        {isFetching?
         <img src={loader} alt='loading_icon' className='w-20 h-20 object-contain'/>
         :error?
         <p className='font-inter font-bold'>
         Well, that was not supposed to happen
         <br/>
         <span>{error?.data?.error}</span>
         </p>
         :
         <div className='flex-col gap-3'>
          <h2 className='font-satoshi font-bold text-gray-600'>Article <span className='blue_gradient'>Summary</span></h2>
          <p className='summary_box font-inter font-medium text-grey-700 text-sm'>
            {article.summary}
          </p>
          </div>}
        </div>
      </div>
    </section>
  )
}

export default Demo