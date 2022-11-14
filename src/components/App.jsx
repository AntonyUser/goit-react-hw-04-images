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

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     imageList: [],
//     isLoading: false,
//     error: '',
//     page: 1,
//     currentImage: null,
//   };

//   componentDidUpdate = async (prevProps, prevState) => {
//     const { page, searchQuery } = this.state;
//     if (prevState.searchQuery !== searchQuery) {
//       this.setState({ isLoading: true });
//       try {
//         const imageList = await FetchImages(searchQuery, page);
//         const {
//           data: { hits },
//         } = imageList;
//         this.setState({
//           imageList: Helper(hits),
//         });
//       } catch (error) {
//         this.setState({ error: error.message });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//     if (prevState.page !== page && page !== 1) {
//       this.setState({ isLoading: true });
//       await FetchImages(searchQuery, page)
//         .then(res => {
//           const { data } = res;
//           this.setState(prevState => ({
//             imageList: [...prevState.imageList, ...Helper(data.hits)],
//           }));
//         })
//         .catch(error => {
//           this.setState(() => ({
//             error: error,
//           }));
//         })
//         .finally(() => {
//           this.setState({
//             isLoading: false,
//           });
//         });
//     }
//   };

//   onSubmit = async ({ query }) => {
//     this.setState({
//       searchQuery: query,
//       page: 1,
//     });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };
//   onClick = item => {
//     this.setState({ currentImage: item });
//   };

//   onClose = () => {
//     this.setState({
//       currentImage: null,
//     });
//   };
//   render() {
//     const { imageList, isLoading, currentImage } = this.state;
//     return (
//       <Main>
//         <Searchbar onSubmit={this.onSubmit} />

//         {imageList.length > 0 && (
//           <>
//             <ImageGallery itemList={imageList} onClick={this.onClick} />
//             {!isLoading && (
//               <NewButton type="button" onClick={this.loadMore}>
//                 Load More
//               </NewButton>
//             )}
//           </>
//         )}
//         {isLoading && <Loader />}
//         {currentImage && (
//           <Modal img={this.state.currentImage} closeModal={this.onClose} />
//         )}
//       </Main>
//     );
//   }
// }
