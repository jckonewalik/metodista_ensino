import styled from 'styled-components';
import { Icon } from '@material-ui/core';

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background:  #F22333;
  color: #fff;
  height: 50px;
`;

export const IconWhite = styled(Icon)`
  color: #fff;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;

`;

export const TitleStyled = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const SubtitleStyled = styled.span`
  font-size: 12px;
`;
