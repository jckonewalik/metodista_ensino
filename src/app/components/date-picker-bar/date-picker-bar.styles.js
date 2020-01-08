import styled from 'styled-components';

export const ContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  min-height: 50px;
  background: #F22333;

  & input {
    text-align: center;
    margin-top: 10px;
  }
  & div {
    color: #fff;
    font-weight: 700;
  }
  & div:before {
    border-bottom: unset;
  }
  & div:after {
    border-bottom: unset;
  }
  & button {
    padding: 0 5px;
  }
`;
