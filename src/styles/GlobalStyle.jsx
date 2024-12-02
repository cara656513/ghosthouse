import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
@font-face{
    font-family: chiller;
    src: url('/font/chiller.ttf') format('truetype')
}
body{
    background-image: url('/background-img2.jpg');
    background-repeat: no-repeat;
    background-size: cover;
} 
`;
export default GlobalStyle;
