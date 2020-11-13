import React, { useState, useEffect } from "react"

function FetchQuote() {

  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  function getQuote() {
    fetch('http://quotes.rest/qod.json?category=funny')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setQuote(data.contents.quotes[0].quote);
        setAuthor(data.contents.quotes[0].author);
        setImgSrc(data.contents.quotes[0].background);
      })
  }

  useEffect(() => {
    getQuote();
    const intervalID = setInterval(() => {
      getQuote()
    }, 24 * 60 * 60 * 1000);
    return () => {
      clearInterval(intervalID);
    }
  }, [])
  return (
    <>
      <h1>{quote}</h1>
      <p>- {author}</p>
      <img src={imgSrc} />
    </>
  )
}
export default FetchQuote