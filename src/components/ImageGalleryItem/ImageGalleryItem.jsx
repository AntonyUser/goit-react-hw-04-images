import PropTypes from 'prop-types';
import { Item } from './ImageGalleryIte.styled';

export const ImageGalleryItem = ({ item, onClick }) => {
  return (
    <Item className="gallery-item" key={item.id}>
      <img
        src={item.webformatURL}
        alt={item.user}
        onClick={() => onClick(item)}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
};
