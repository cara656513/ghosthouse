import supabase from '../../utils/supabaseClient';
import { toast } from 'react-toastify';

const usePostDataDelete = (setContents) => {
  // 내 게시물 삭제
  const handleDelete = async (postId) => {
    try {
      if (window.confirm('삭제하시겠습니까?')) {
        const { error } = await supabase.from('posts').delete().eq('id', postId);
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
      }
    } catch (err) {
      console.error('삭제 중 예외 발생:', err.message);
    }
  };

  return { handleDelete };
};

export default usePostDataDelete;
