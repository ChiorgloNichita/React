import styled from 'styled-components';

const HeaderStyled = styled.header`
  background-color:rgb(70, 11, 172);
  color: white;
  padding: 5px;
  text-align: center;
`;

function Header() {
  return (
    <HeaderStyled>
      <h1>Mini-Blog</h1>
    </HeaderStyled>
  );
}

export default Header;