import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ itemList, onClick }) => {
  return (
    <>
      <List className="gallery">
        {itemList.map(item => {
          return (
            <ImageGalleryItem item={item} key={item.id} onClick={onClick} />
          );
        })}
      </List>
    </>
  );
};

ImageGallery.propTypes = {
  itemList: PropTypes.arrayOf(
    PropTypes.exact({
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
