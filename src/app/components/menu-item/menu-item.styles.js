import styled from 'styled-components';

export const MenuItemStyled = styled.button`
  width: 100%;
  height: 60px;
  background: #fff;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  -webkit-box-shadow: 0px 0px 5px 0px #5e5e5e;
  box-shadow: 0px 0px 5px 0px #5e5e5e;
`;

export const MenuItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageStyled = styled.img`
  width: 30px;
`;

export const TextStyled = styled.span`
  margin-left: 15px;
  font-size: 16px;
  font-weight: 700;
  color: #5e5e5e;
`;
