import { useState } from 'react';
import LoggedinHeader from './LoggedinHeader';
import LoggedoutHeader from './LoggedoutHeader';
import { NavHeader, NavLink } from './headerStyle';




const Header = () => {
  const [isLoggedin, setIsLoggedin] = useState(true);

  return (
    <NavHeader>
      <div>
        <NavLink to={'/'}>GHOST HOUSE</NavLink>
      </div>
      <div>{isLoggedin ? <LoggedinHeader /> : <LoggedoutHeader />}</div>
    </NavHeader>
  );
};

export default Header;
