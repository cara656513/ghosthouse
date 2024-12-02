import React, { useEffect } from 'react';
import supabase from '../../utils/supabaseClient';

const SearchPost = () => {
  const [searchPost, setSearchPost] = useSearchParams('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const SearchPost = async () => {
      const { data: post, error } = await supabase.from('posts').select('*').eq('title', title);
    };
    if (error) {
      throw error;
    }
    setPosts(post[0]);
  }, []);
  return <div>SearchPost</div>;
};

export default SearchPost;
