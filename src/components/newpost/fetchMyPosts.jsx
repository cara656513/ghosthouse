import supabase from '../../utils/supabaseClient';

export const fetchMyPosts = async (userid) => {
  const { data, count, error } = await supabase
    .from('posts')
    .select('id, title, content, created_at, post_img, longitude, latitude', { count: 'exact' })
    .eq('user_id', userid);
  if (error) {
    console.error('Error fetching myposts:', error);
    return;
  }
  return data;
};
