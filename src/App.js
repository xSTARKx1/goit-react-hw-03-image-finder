import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import styles from './App.module.css';
import imagesApi from './services/images-api';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    largeImage: '',
    isLoading: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProprs, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }

    if (prevState.images.length !== this.state.images.length) {
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };

  onChangeQuery = ({ query }) => {
    this.setState({ searchQuery: query, currentPage: 1, images: [] });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = {
      searchQuery,
      currentPage,
    };

    this.setState({ isLoading: true });

    imagesApi
      .fetchImages(options)
      .then(res => {
        this.setState(prevState => ({
          images: [...prevState.images, ...res.data.hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  clickOnImage = e => {
    e.preventDefault();

    this.setState({
      largeImage: e.currentTarget.href,
    });
  };

  closeModal = () => {
    this.setState({ largeImage: '' });
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.closeModal();
    }
  };

  render() {
    const { images, isLoading, largeImage } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} click={this.clickOnImage} />
        {largeImage && (
          <Modal handleBackdropClick={this.handleBackdropClick}>
            <img src={largeImage} alt={largeImage} />
          </Modal>
        )}
        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#3618df"
            height={80}
            width={80}
            className={styles.loader}
          />
        )}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.fetchImages} />
        )}
      </div>
    );
  }
}

export default App;
