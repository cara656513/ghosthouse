import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Toastcontainer = styled(ToastContainer).attrs({
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true
})`
  .Toastify__toast {
    background-color: #333;
    color: #fff;
    font-size: 14px;
    border-radius: 8px;
    padding: 10px;
  }
  .Toastify__toast--success {
    background-color: black;
    color: red;
  }
  .Toastify__toast--error {
    background-color: #f44336;
  }
  .Toastify__toast--info {
    background-color: #4caf50;
  }
  .Toastify__toast--warning {
    background-color: black;
    color: red;
  }
`;
export default Toastcontainer;
