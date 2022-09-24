import { useGlobalContext } from "../contexts/Appcontext";

function Nav() {
  const { fav, setSearchTerm, handleSubmit, handleModal } = useGlobalContext();
  let favorite;
  {
    fav.length > 0
      ? (favorite = fav.map((meal) => (
          <div className='fav' key={meal.idMeal}>
            <img
              onClick={() => handleModal(meal.idMeal)}
              src={`${meal.strMealThumb}/preview`}
              alt='meal of image'
            />
            <h3>{meal.strMeal}</h3>
          </div>
        )))
      : (favorite = "");
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className='nav-cont'>
        <nav className='navbar'>
          <div className='title-cont'>
            <div className='title'>
              <h1>elles</h1>
              <span>Kitchen</span>
            </div>
          </div>
          {/* input box */}
          <div className='search-bar'>
            <div className='search-flex'>
              <input
                type='text'
                placeholder='Search for meal'
                onChange={handleSearch}
              />
              <span>
                <button className='search-btn' onClick={(e) => handleSubmit(e)}>
                  Search
                </button>
              </span>
            </div>
            <button className='random-btn' onClick={(e) => handleSubmit(e)}>
              Surprise me
            </button>
          </div>
        </nav>
      </div>
      <section>
        <div className='fav-meals'>
          <h3>Favorites</h3>
          <div className='fav-meals-container'>{favorite}</div>
        </div>
      </section>
    </>
  );
}

export default Nav;
