import supabase from '../../utils/supabaseClient';
import { toast } from 'react-toastify';

const usePostDataDelete = (setContents) => {
  // 내 게시물 삭제
  const handleDelete = async (postId) => {
    try {
      // 삭제를 테스트 하기 위해서 임시 값을 넣어둠
      const { error } = await supabase.from('posts').delete().eq('id', postId);
      // 현제 코드는 로그인값이 구현되지 않아서 userId값이 아니라 tsetID값을 사용중임
      if (error) {
        console.log(error);
        toast.warning('삭제 중 문제가 발생했습니다.');
      } else {
        // posts 배열에서 삭제된 게시글을 필터링하여 상태 업데이트
        setContents((prevData) => ({
          ...prevData, // 기존 객체 유지
          posts: prevData.posts.filter((post) => post.id !== postId) // posts 배열 업데이트
        }));

        toast.warning('게시물이 삭제되었습니다.');
      }
    } catch (err) {
      console.error('삭제 중 예외 발생:', err.message);
    }
  };

  return { handleDelete };
};

export default usePostDataDelete;
