import { useGlobalContext } from "../contexts/Appcontext";
import Modal from "./Modal";

function Main() {
  const {
    data: { meals },
    data,
    loading,
    fav,
    setFav,
    modalState,
    handleModal,
  } = useGlobalContext();

  function addFav(id) {
    if (fav.some((meal) => meal.idMeal === id)) {
      let filteredMeal = fav.filter((removedmeal) => removedmeal.idMeal !== id);
      setFav(filteredMeal);
    } else {
      const favMeal = meals.find((meal) => meal.idMeal === id);
      setFav((prev) => [...prev, favMeal]);
    }
  }

  if (loading) {
    return (
      <>
        <h1
          style={{ textAlign: "center", marginTop: "2rem", fontSize: "3rem" }}
        >
          Loading...
        </h1>
      </>
    );
  }
  if (data.length < 1) {
    return (
      <h1 style={{ margin: "5rem 0 0 0", textAlign: "center" }}>
        Meals not found.Please try again.{" "}
      </h1>
    );
  }

  let mainMeals = meals.map((meal) => {
    let eachMeal = (
      <div key={meal.idMeal} className='box'>
        <img
          src={`${meal.strMealThumb}/preview`}
          onClick={() => handleModal(meal.idMeal)}
          alt='Meal'
        />
        <div className='details'>
          <h3>{meal.strMeal}</h3>
          <button className='addfav' onClick={() => addFav(meal.idMeal)}>
            {!fav.find((eachmeal) => eachmeal.idMeal === meal.idMeal)
              ? "Add to Fav"
              : "Added"}
          </button>
        </div>
      </div>
    );

    return eachMeal;
  });

  return (
    <>
      <div className='main-container'>
        <div className='box-container'>{mainMeals}</div>
      </div>
      {modalState && <Modal />}
      <footer>
        <h2>&copy;elleskitchen2022</h2>
      </footer>
    </>
  );
}

export default Main;
