import { Helper } from 'Helper/Helper';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FetchImages } from './API/API';
import { Main } from './App.styled';
import { NewButton } from './Button/Button.styled';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [currentImage, setCurrentImage] = useState(null);

  const onSubmit = async ({ query }) => {
    setSearchQuery(query);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };
  const onClick = item => {
    setCurrentImage(item);
  };

  const onClose = () => {
    setCurrentImage(null);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const imageList = await FetchImages(searchQuery, page);
        const {
          data: { hits },
        } = imageList;
        if (page === 1) {
          setImageList(Helper(hits));
        } else {
          setImageList(prev => [...prev, ...Helper(hits)]);
        }
      } catch (Error) {
        setError(Error.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [error, page, searchQuery]);

  return (
    <Main>
      <Searchbar onSubmit={onSubmit} />

      {imageList.length > 0 && (
        <>
          <ImageGallery itemList={imageList} onClick={onClick} />
          {!isLoading && (
            <NewButton type="button" onClick={loadMore}>
              Load More
            </NewButton>
          )}
        </>
      )}
      {isLoading && <Loader />}
      {currentImage && <Modal img={currentImage} closeModal={onClose} />}
    </Main>
  );
};
