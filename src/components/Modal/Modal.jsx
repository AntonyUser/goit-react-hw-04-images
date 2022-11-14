import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ img: { largeImageURL, user }, closeModal }) => {
  useEffect(() => {
    const onCloseByEscape = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onCloseByEscape);

    return () => {
      window.removeEventListener('keydown', onCloseByEscape);
    };
  }, [closeModal]);

  const onClosebyBackdrop = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={onClosebyBackdrop}>
      <div className={css.Modal}>
        <button className={css.Btn} onClick={closeModal}>
          Close
        </button>
        <img src={largeImageURL} alt={user} width="900"></img>
      </div>
    </div>
  );
};

Modal.propTypes = {
  img: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }),
  closeModal: PropTypes.func.isRequired,
};
