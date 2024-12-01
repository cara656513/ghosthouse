const ProtectedRoute = ({ element: Element, ...rest }) => {
  return <Element {...rest} />;
};

export default ProtectedRoute;
