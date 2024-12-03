import AddPost from '../components/newpost/AddPost';
import Postform from '../components/newpost/postform';

const NewPost = () => {
  return <Postform mode={'newPost'} onSubmit={AddPost} />;
};

export default NewPost;
