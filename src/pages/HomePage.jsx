import { useRef } from 'react';
import Home from '../components/home/Home';
import HomeMap from '../components/home/HomeMap';

const HomePage = () => {

  const bottomRef = useRef();
  const onMoveToForm = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };


  return (
    <div>
      <Home onScroll={onMoveToForm} />
      <HomeMap />
      <div ref={bottomRef}></div>
    </div>
  );

};

export default HomePage;
