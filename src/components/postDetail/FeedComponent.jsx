import { GiGhost } from 'react-icons/gi';
import { TiUserDelete } from 'react-icons/ti';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../zustand/userStore';
import { CommentForm, CommentWrap, ContentsWrap, FeedContainer, FeedLi, ImgWrap, TitleWrap } from './postDetailStyle';

const FeedComponent = () => {
  const { id } = useParams(); // post 게시글 id를 가져올거
  const [comments, setComments] = useState([]); //댓글들 state
  const [newComments, setNewcomments] = useState(''); // 댓글 추가하기
  const [posts, setPosts] = useState([]);

  // 유저 정보 가져오기
  const user = useUserStore((state) => state.user);

  // db 데이터 가져오기
  useEffect(() => {
    //페이지 로드 시 페이지 최상단으로
    window.scrollTo(0, 0);

    // 포스트 테이블 데이터 가져오기
    const getPost = async () => {
      try {
        const { data: post, error } = await supabase.from('posts').select(`*, users(nickname)`).eq('id', id);
        if (error) {
          throw error;
        }
        setPosts(post);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
    //getComment를 합쳐줌으로써 불필요한 useEffect의 중복을 없앰
    getComment();
  }, []);

  // 댓글 가져오기
  const getComment = async () => {
    try {
      const { data } = await supabase.from('comments').select(`*, users(*)`).eq('post_id', id);
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewComment = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('comments')
        .insert([{ post_id: id, user_id: user.id, comment: newComments }]);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setNewcomments('');
      getComment();
    }
  };

  const handleComment = (e) => {
    setNewcomments(e.target.value);
  };

  const deleteComment = async (id) => {
    try {
      const { error } = await supabase.from('comments').delete().eq('id', id);
      if (error) {
        throw error;
      }
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FeedContainer>
      <FeedLi key={posts[0]?.id}>
        <TitleWrap>
          <h1>{posts[0]?.title}</h1>
          <h2>{`글 작성 : ${posts[0]?.users.nickname}`}</h2>
        </TitleWrap>
        <ImgWrap>
          <img src={posts[0]?.post_img} alt={posts[0]?.title} />
          <Map // 지도를 표시할 Container
            center={{ lat: posts[0]?.latitude, lng: posts[0]?.longitude }}
            style={{
              // 지도의 크기
              width: '300px',
              height: '400px'
            }}
            level={11} // 지도의 확대 레벨
          >
            <MapMarker
              position={{
                lat: posts[0]?.latitude,
                lng: posts[0]?.longitude
              }}
            />
          </Map>
        </ImgWrap>
        <ContentsWrap>
          <p>{posts[0]?.content}</p>
          <CommentWrap>
            <CommentForm>
              <input type="text" placeholder="댓글을 입력해주세요" onChange={handleComment} value={newComments} />
              <button onClick={addNewComment}>
                <GiGhost />
              </button>
            </CommentForm>
            <div>
              {comments.map((comment) => (
                <div key={comment.id}>
                  <span>
                    {comment.users.nickname} : {comment.comment}
                    {comment.users.id === user.id && (
                      <button onClick={() => deleteComment(comment.id)}>
                        <TiUserDelete />
                      </button>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </CommentWrap>
        </ContentsWrap>
      </FeedLi>
    </FeedContainer>
  );
};

export default FeedComponent;
