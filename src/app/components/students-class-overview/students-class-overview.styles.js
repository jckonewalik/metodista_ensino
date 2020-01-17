import styled, { css } from 'styled-components';

const colorPrimary = css`
  color: #706F6F;
`;

const colorSecundary = css`
  color: #929292;
`;

export const ContainerStyled = styled.div`
  margin: 0 auto 10px;
  width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
`;

export const ClassContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ClassNameStyled = styled.span`
  ${colorPrimary}
  font-weight: 700;
  font-size: 18;
`;

export const ClassDescriptionStyled = styled.span`
  ${colorSecundary}
  font-size: 16;
`;
