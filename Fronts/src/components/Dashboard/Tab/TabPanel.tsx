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
          <Typography>
            <div>{children}</div>
            </Typography>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;