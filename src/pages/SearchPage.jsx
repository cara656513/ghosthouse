import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchPost from '../components/postDetial/SearchPost';

const SearchPage = () => {
  const [searchPost, setSearchPost] = useSearchParams('');
  const [posts, setPosts] = useState([]);

  return <SearchPost />;
};

export default SearchPage;
