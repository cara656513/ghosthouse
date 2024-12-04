import { GiGhost } from 'react-icons/gi';
import { TiUserDelete } from 'react-icons/ti';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../zustand/userStore';

const FeedComponent = () => {
  const { id } = useParams(); // post 게시글 id를 가져올거
  const [comments, setComments] = useState([]); //댓글들 state
  const [newComments, setNewcomments] = useState(''); // 댓글 추가하기
  const [posts, setPosts] = useState([]);
  const user = useUserStore((state) => state.user);

  // db 데이터 가져오기
  useEffect(() => {
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
  }, []);

  console.log('user', user);
  // 댓글 가져오기
  const getComment = async () => {
    try {
      const { data } = await supabase.from('comments').select(`*, users(*)`).eq('post_id', id);
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log('Comments', comments);

  useEffect(() => {
    getComment();
  }, []);

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
                    {comment.users.id === user?.user.id && (
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

export const FeedContainer = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  padding: 0;
  list-style: none;
`;

export const FeedLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  margin-bottom: 50px;
  padding: 20px;
`;

export const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 80%;
  margin: 30px;

  h1 {
    font-size: 1.8rem;
    color: #a80101;
    margin: 0;
    font-weight: bold;
  }
  h2 {
    font-size: 0.9rem;
    color: #e5e5e599;
    margin: 0;
  }

  span {
    font-size: 0.9rem;
    color: #e0e0e0;
    width: 100%;
  }
`;

export const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    width: 60%;
    height: 400px;
    object-fit: cover;
  }
`;

export const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 30px 0;

  p {
    font-size: 1.2rem;
    color: #ffffff;
    line-height: 1.5;
    word-wrap: break-word;
    background-color: #6f0000;
    padding: 40px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(50, 50, 50, 0.5);
    border: none;
    padding: 10px;
    font-size: 1rem;
    color: #ffffff;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-left: 10px;
  }

  svg {
    color: #a80101;
    font-size: 1.5rem;
  }

  button:hover svg {
    color: #ff4545; /* 호버 시 아이콘 색상 변경 */
  }
`;

export const CommentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-top: 40px;

  span {
    margin-bottom: 10px;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  margin-top: 20px;
  width: 100%;
  justify-content: space-between;

  input {
    color: #fff;
    display: block;
    width: 95%;
    padding: 10px 5px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    &::placeholder {
      color: #ffffff;
      font-size: 1.1rem;
    }
  }
`;
