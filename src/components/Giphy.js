import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import Loader from './Loader';
import Paginate from './Paginate';

const Giphy = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  let mq="abc";

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
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

  const renderGifs = () => {
    // console.log("ender gif called");
    if (isloading) {
      return <Loader />
    }
    return currentItems.map(el => {
      return (
        <div key={el.id} className='gif'>
          <img className={'gifimage'} src={el.images.fixed_height.url} />
        </div>
      )
    })
  }

  const renderError = () => {
    if (isError) {
      return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Unable to fetch Gifs, please try again
        </div>
      );
    }
  }


  const getData = async event => {
    event.preventDefault();
    const {value}=event.target;
    mq=value;
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
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

  // const handleSearchChange = event => {
  //   setQuery(event.target.value);
  // };

  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="inner-container">
      {renderError()}
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
        {renderGifs()}
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