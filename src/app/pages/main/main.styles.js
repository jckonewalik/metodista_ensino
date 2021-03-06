import styled, { css } from 'styled-components';

const closedMenuStyle = css`
  left: -400px;
}`;

const openMenuStyle = css`
  left: 0;
`;

const getMenuPosition = (props) => {
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
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #fff;
  padding: 0 10px;
  height: calc(100vh - 80px);
`;

export const MenuContainerStyled = styled.div`
  background: #fff;
  position: absolute;
  left: -400px;
  height: calc(100vh - 80px);
  width: 100%;
  overflow: hidden;
  -webkit-transition:width .1s linear;
  transition:left .1s linear;
  -webkit-transform:translateZ(0) scale(1,1);
  z-index:1000;
  border-right: solid 1px #EAEAEA;

  @media screen and (min-width: 400px) {
    width: 400px;
  }

  ${getMenuPosition}
`;
