import styled from 'styled-components';

export const ContainerStyled = styled.div`
  padding: 20px 0;

  @media screen and (min-width: 800px) {
    display: grid;
    justify-content: space-around;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
