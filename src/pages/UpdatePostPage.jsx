import Postform from '../components/newpost/PostForm';
import { useParams } from 'react-router-dom';
import supabase from '../utils/supabaseClient';
import Toastcontainer from '../utils/toastcontainer';
import { toast } from 'react-toastify';

const UpdatePostPage = () => {
  const { id } = useParams();

  const editPost = async (user, updatingObj) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({
          user_id: user.id,
          ...updatingObj
        })
        .eq('id', `${id}`)
        .select();

      console.log('Post data:', data);
      toast.success('글이 수정되었습니다!');

      if (error) throw error;
    } catch (error) {
      console.error('Error submitting post:', error.message);
    }
  };

  return (
    <>
      <Toastcontainer />
      <Postform mode={'editPost'} onSubmit={editPost} />
    </>
  );
};

export default UpdatePostPage;
