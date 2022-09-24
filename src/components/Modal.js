import { useGlobalContext } from "../contexts/Appcontext";

const Modal = () => {
  const { modalMeal, setModalState, setModalMeal } = useGlobalContext();
  const {
    idMeal,
    strMealThumb: image,
    strMeal,
    strInstructions,
    strSource,
  } = modalMeal;

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <div className='modal-container' key={idMeal}>
      <div className='modal'>
        <img src={`${image}/preview`} alt={strMeal} />
        <div className='modal-details'>
          <h4>{strMeal}</h4>
          <p>{strInstructions}</p>
        </div>
        <div>
          <a href={strSource} target='_blank'>
            Original Source
          </a>
        </div>

        <div className='modal-btn-div'>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
