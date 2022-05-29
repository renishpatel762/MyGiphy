import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import Paginate from './Paginate';
import RenderError from './RenderError';
import RenderGif from './RenderGif';

const Giphy = (props) => {
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  let mq="abc";
  const GIPHY_API=props.apikey;

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: GIPHY_API,
            limit: 30
          }
        });

        console.log(results);
        setData(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getData = async event => {
    event.preventDefault();
    const {value}=event.target;

    mq=value;

    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: GIPHY_API,
          q: mq,
          limit: 30
        }
      });
      setData(results.data.data);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }
    setIsLoading(false);
  };

  const myDeBounce=(call)=>{
    let timer;
    return function(...args){
      const context=this;
      if(timer) clearTimeout(timer);
      timer = setTimeout(()=>{
        timer=null
        call.apply(context,args);
      },500);
    }
  }
  const BetterFunction=useCallback(myDeBounce(getData),[]);


  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="inner-container">
      <RenderError isError={isError} />
      <form className="form-inline d-flex justify-content-center p-2">
        <input
          // value={query}
          onChange={BetterFunction}
          type="text"
          placeholder="search"
          className="form-control myinput"

        />
        <button
          onClick={getData}
          type="submit"
          className="btn btn-dark mx-2 btn-large"
          style={{ marginTop: '1.3vh' }}
        >
          Search Gif
        </button>
      </form>
      <div className='gif-container gifs'>
        <RenderGif isloading={isloading} currentItems={currentItems} />
      </div>
      <Paginate
        pageSelected={pageSelected}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
      />
    </div>
  )
}

export default Giphy