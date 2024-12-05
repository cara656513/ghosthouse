import Toastcontainer from '../utils/toastcontainer';
import AddPost from '../components/newpost/AddPost';
import Postform from '../components/newpost/PostForm';

const NewPost = () => {
  return (
    <>
      <Toastcontainer />
      <Postform mode={'newPost'} onSubmit={AddPost} />
    </>
  );
};

export default NewPost;
