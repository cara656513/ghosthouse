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

export const fetchPostDetail = async (postId) => {
  const { data: posts, error } = await supabase.from('posts').select('*').eq('id', postId).single();
  if (error) {
    console.error('Error fetching myposts:', error);
    return;
  }
  return posts;
};
// 나중에 여기다가 탠스택 쿼리를 넣고, 단순 supabase호출은 api폴더로 빼면 더 깔끔해질 것 같아요!!
