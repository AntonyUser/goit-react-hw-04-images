import React from 'react';
import { Component } from 'react';
import { FetchImages } from './API/API';
import { Main } from './App.styled';
import { NewButton } from './Button/Button.styled';
import { Helper } from './Helper/Helper';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchQuery: '',
    imageList: [],
    isLoading: false,
    error: '',
    page: 1,
    currentImage: null,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { page, searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.setState({ isLoading: true });
      try {
        const imageList = await FetchImages(searchQuery, page);
        const {
          data: { hits },
        } = imageList;
        this.setState({
          imageList: Helper(hits),
        });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
    if (prevState.page !== page && page !== 1) {
      this.setState({ isLoading: true });
      await FetchImages(searchQuery, page)
        .then(res => {
          const { data } = res;
          this.setState(prevState => ({
            imageList: [...prevState.imageList, ...Helper(data.hits)],
          }));
        })
        .catch(error => {
          this.setState(() => ({
            error: error,
          }));
        })
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    }
  };

  onSubmit = async ({ query }) => {
    this.setState({
      searchQuery: query,
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  onClick = item => {
    this.setState({ currentImage: item });
  };

  onClose = () => {
    this.setState({
      currentImage: null,
    });
  };
  render() {
    const { imageList, isLoading, currentImage } = this.state;
    return (
      <Main>
        <Searchbar onSubmit={this.onSubmit} />

        {imageList.length > 0 && (
          <>
            <ImageGallery itemList={imageList} onClick={this.onClick} />
            {!isLoading && (
              <NewButton type="button" onClick={this.loadMore}>
                Load More
              </NewButton>
            )}
          </>
        )}
        {isLoading && <Loader />}
        {currentImage && (
          <Modal img={this.state.currentImage} closeModal={this.onClose} />
        )}
      </Main>
    );
  }
}
