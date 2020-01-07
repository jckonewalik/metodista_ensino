import styled, { css } from 'styled-components';

const closedMenuStyle = css`
  width: 0;
}`;

const openMenuStyle = css`
  width: 100%;

  @media screen and (min-width: 400px) {
    width: 400px;
  }
`;

const getMenuSize = (props) => {
  if (props.toggled) {
    return openMenuStyle;
  }
  return closedMenuStyle;
};

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

export const ContentStyled = styled.div`
  flex: 1;
  background: #EAEAEA;
  padding: 0 10px;
  height: 100vh;

`;

export const MenuContainerStyled = styled.div`
  background: #fff;
  position: absolute;
  left: 0;
  height: 100%;
  width: 0;
  overflow: hidden;
  -webkit-transition:width .1s linear;
  transition:width .1s linear;
  -webkit-transform:translateZ(0) scale(1,1);
  z-index:1000;

  ${getMenuSize}
`;
