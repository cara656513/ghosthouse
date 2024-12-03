import supabase from '../../utils/supabaseClient';

//수파베이스에서 현재 로그인한 사람 가져오기
export const fetchUserData = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error('Error fetching user:', userError);
    return;
  }
  return userData.user;
};
