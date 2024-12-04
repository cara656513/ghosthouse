import { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';
import { useSearchParams } from 'react-router-dom';
import { ContentsWrap, FeedContainer, FeedLi, ImgWrap, TitleWrap } from './FeedComponent';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const SearchPost = () => {
  const [searchPost, setSearchPost] = useSearchParams('');
  const [posts, setPosts] = useState([]);
  const searchValue = searchPost.get('q');

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data: post, error } = await supabase
          .from('posts')
          .select(`*, users(nickname)`)
          .ilike('title', `%${searchValue}%`);
        if (error) {
          throw error;
        }
        setPosts(post || []);
      } catch (error) {
        console.error(error);
      }
    };
    if (searchValue) {
      getPost();
    }
  }, []);
  console.log(posts);

  return (
    <>
      <FeedContainer>
        {posts.map((post) => (
          <FeedLi key={post.id}>
            <TitleWrap>
              <h1>{post.title}</h1>
              <h2>{`글 작성 : ${post.users?.nickname || '익명 사용자'}`}</h2>
            </TitleWrap>
            <ImgWrap>
              {post.post_img && <img src={post.post_img} alt={post.title} />}
              {post.latitude && post.longitude && (
                <Map
                  center={{ lat: post.latitude, lng: post.longitude }}
                  style={{ width: '300px', height: '400px' }}
                  level={11}
                >
                  <MapMarker position={{ lat: post.latitude, lng: post.longitude }} />
                </Map>
              )}
            </ImgWrap>
            <ContentsWrap>
              <p>{post.content}</p>
            </ContentsWrap>
          </FeedLi>
        ))}
      </FeedContainer>
    </>
  );
};

export default SearchPost;
