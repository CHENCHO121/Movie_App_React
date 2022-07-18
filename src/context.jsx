import { createContext, useContext, useEffect, useState } from "react";

//Store or warehouse
const AppContext = createContext();

//API URL

export const API_URL = `https://omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

//Delivery boy or provider

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [query,setQuery]=useState('titanic')

  const getMovies = async (url) => {
    setIsLoading(true)
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search);
        setIsError({
            show:false,
            msg:""
        })
      } else {
        setIsError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timeOut= setTimeout(()=>{
    
        getMovies(`${API_URL}&s=${query}`);

    },500)

    return ()=>clearTimeout(timeOut)

  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, isError, movie,query,setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

//useGlobalContext custom hook

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
