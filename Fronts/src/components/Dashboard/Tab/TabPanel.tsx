import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, height: '100%' }}>
<<<<<<< HEAD
          <Typography>
            <div>{children}</div>
            </Typography>
=======
          <Typography>{children}</Typography>
>>>>>>> f241765ecc4b94d270451ea4c72a045d17b9e795
        </Box>
      )}
    </div>
  );
};

export default TabPanel;