import { IoSearch } from 'react-icons/io5';
import { HomeForm, HomeH1, HomeWrap } from '../home/homeStyle';

const Home = () => {
  return (
    <HomeWrap>
      <div>
        <HomeH1>WARNING</HomeH1>
      </div>
      <div>
        <HomeForm>
          <input type="text" placeholder="SEARCH GHOST HOUSE" />
          <button>
            <IoSearch />
          </button>
        </HomeForm>
      </div>
    </HomeWrap>
  );
};

export default Home;
