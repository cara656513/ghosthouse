import { HomeForm, HomeH1, HomeWrap } from '../home/homeStyle';
import { MdManageSearch } from 'react-icons/md';
import hand from '../../assets/hand.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = ({ onScroll }) => {
  const [searchValue, setSearchValue] = useState('');
  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    nav(`/search?q=${searchValue}`);
  };
  return (
    <HomeWrap>
      <div>
        <HomeH1>WARNING</HomeH1>
      </div>
      <div>
        <HomeForm onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="SEARCH GHOST HOUSE"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
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
