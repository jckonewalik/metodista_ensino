import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const FooterContent = styled.div`
  display: flex;
  margin: 10px 0;
  justify-content: flex-end;
`;

export const TitleStyled = styled(Typography)`
  flex: 1;
  margin-left: 5px;
`;

export const BodyContainer = styled.div`
  flex: 1;
  margin: 20px auto 0;
  width: 100%;
  overflow: scroll;

  @media screen and (min-width: 900px) {
    width: 800px;
    margin: 30px auto 0;
  }
`;

export const FormStyled = styled.form`
  @media screen and (min-width: 900px) {
    width: 800px;
    margin: 30px auto 0;
  }
`;

export const StudentItemStyled = styled.div`
  display: flex;
  padding: 10px;
  height: 70px;
  align-items: center;
  border-bottom: 1px solid #EAEAEA;
`;
