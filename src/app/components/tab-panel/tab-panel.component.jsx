import React from 'react';
import { Box } from '@material-ui/core';

const TabPanel = (props) => {
  const {
    children, value, index,
  } = props;
  return (
    value === index && <Box>{children}</Box>
  );
};

export default TabPanel;
