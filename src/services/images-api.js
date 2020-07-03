import axios from 'axios';

const fetchImages = ({ searchQuery, currentPage }) => {
  return axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=16292415-b72e1ae2e957998a23d4228ff&image_type=photo&orientation=horizontal&per_page=12`,
  );
};

export default { fetchImages };
