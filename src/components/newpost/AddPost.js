import supabase from '../../utils/supabaseClient';

const AddPost = async (user, updatingObj) => {
  try {
    const { data, error } = await supabase.from('posts').insert({
      user_id: user.id,
      ...updatingObj
    });

    console.log('Post data:', data);
    if (error) throw error;
    alert('글이 등록되었습니다!');
  } catch (error) {
    console.error('Error submitting post:', error.message);
  }
};

export default AddPost;
