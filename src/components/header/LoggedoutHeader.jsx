import { NavLink } from './headerStyle';

const LoggedoutHeader = () => {
  return (
    <div>
      <NavLink to={'/signin'}>LOGIN</NavLink>
      <NavLink to={'/signup'}>SIGNUP</NavLink>
    </div>
  );
};

export default LoggedoutHeader;
