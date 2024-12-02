import { HomeForm, HomeH1, HomeWrap } from '../home/homeStyle';
import { MdManageSearch } from 'react-icons/md';
import hand from '../../assets/hand.png';

const Home = ({ onScroll }) => {
  return (
    <HomeWrap>
      <div>
        <HomeH1>WARNING</HomeH1>
      </div>
      <div>
        <HomeForm>
          <input type="text" placeholder="SEARCH GHOST HOUSE" />
          <button>
            <MdManageSearch />
          </button>
        </HomeForm>
      </div>
      <img onClick={onScroll} src={hand} alt="hand" />
    </HomeWrap>
  );
};

export default Home;
