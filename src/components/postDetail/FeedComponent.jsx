import { GiGhost } from 'react-icons/gi';
import { TiUserDelete } from 'react-icons/ti';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';
import { useParams } from 'react-router-dom';

const FeedComponent = () => {
  const { id } = useParams(); // post 게시글 id를 가져올거
  const [comments, setComments] = useState([]); //댓글들 state
  const [newComments, setNewcomments] = useState(''); // 댓글 추가하기

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  console.log('posts', posts.users);
  console.log('user', user);
  console.log('comments', comments);

  // 포스츠 테이블의 모든 데이터 가져오기
  // useEffect(() => {
  //   const getPostData = async () => {
  //     try {
  //       const { data, error } = await supabase.from('posts').select(`*,users(nickname)`).eq('id', id);
  //       if (error) {
  //         throw error;
  //       }
  //       setPosts(data);
  //     } catch (error) {
  //       console.error(error.message);
  //       return;
  //     }
  //   };
  //   getPostData();
  // }, [id]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data: post, error } = await supabase.from('posts').select(`*, users(nickname)`).eq('id', id);
        if (error) {
          throw error;
        }
        setPosts(post);
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();
        // 유저 데이터 가져올거
        if (userError) {
          throw userError;
        }
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, []);

  // 댓글 가져오기
  const getComment = async () => {
    try {
      const { data } = await supabase.from('comments').select(`*, users(nickname)`).eq('post_id', id);
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

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
      console.error('댓글 삭제 중 에러 발생:', error);
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
          <img
            src="https://i.namu.wiki/i/D-w7TbuyFXUOWmIK0a672ExM9mpiEJAnJzf30EHmfCp-3GVkhNmnonbMklnaB5LdvJEG_2H4HvTRN5J-ak31MQ.webp"
            alt=""
          />
          <Map // 지도를 표시할 Container
            center={{ lat: posts[0]?.latitude, lng: posts[0]?.longitude }}
            style={{
              // 지도의 크기
              width: '300px'
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
                    <button onClick={() => deleteComment(comment.id)}>
                      <TiUserDelete />
                    </button>
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

const FeedContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  padding: 0;
  list-style: none;
`;

const FeedLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  margin-bottom: 50px;
  padding: 20px;
`;

const TitleWrap = styled.div`
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

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;

  img {
    max-width: 100%;
  }
`;

const ContentsWrap = styled.div`
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

const CommentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-top: 40px;

  span {
    margin-bottom: 10px;
  }
`;

const CommentForm = styled.form`
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
