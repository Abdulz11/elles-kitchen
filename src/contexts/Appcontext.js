import { useState, useEffect, createContext, useContext } from "react";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [loading, setIsLoading] = useState(true);
  const [modalMeal, setModalMeal] = useState(null);
  const [modalState, setModalState] = useState(false);

  const [data, setData] = useState([]);
  const [fav, setFav] = useState(
    () => JSON.parse(localStorage.getItem("fav")) || []
  );
  const [searchTerm, setSearchTerm] = useState("a");
  const mainUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

  const handleSubmit = (e) => {
    if (e.target.className === "random-btn") {
      getData(randomMealUrl);
      return;
    }
    getData(mainUrl);
  };

  const handleModal = (id) => {
    let favId = fav.find((meal) => meal.idMeal === id);
    if (favId) {
      setModalMeal(favId);
    } else {
      let meal = data.meals.find((meal) => meal.idMeal === id);
      setModalMeal(meal);
    }
    setModalState(true);
    console.log(modalMeal);
  };

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok !== true) {
      }
      const data = await response.json();
      setIsLoading(false);
      if (data.meals) {
        setData(data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData(mainUrl);
  }, []);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);

  console.log(data.meals);
  return (
    <AppContext.Provider
      value={{
        data,
        loading,
        setFav,
        fav,
        setSearchTerm,
        handleSubmit,
        modalMeal,
        setModalMeal,
        modalState,
        setModalState,
        handleModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
