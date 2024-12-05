import { v4 as uuidv4 } from 'uuid';
import supabase from '../../utils/supabaseClient';

const uploadFile = async (input) => {
  const { data, error } = await supabase.storage.from('Image').upload(`Post/${uuidv4()}.png`, input.img);
  if (error) {
    console.log(error);
    throw error;
  }
  const { data: imgdata } = supabase.storage.from('Image').getPublicUrl(data.path);
  return imgdata.publicUrl;
};

export default uploadFile;
