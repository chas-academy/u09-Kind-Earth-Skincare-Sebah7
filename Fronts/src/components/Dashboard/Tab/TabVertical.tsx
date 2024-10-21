import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel';
import a11yProps from './a11yProps';
import React from 'react';

const russianViolet = '#440245';

interface TabProps {
  label: string;
  content: React.ReactNode;
}

interface VerticalTabsProps {
  tabs: TabProps[];
}

const VerticalTabs: React.FC<VerticalTabsProps> = ({ tabs }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', height: '100%' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {tabs.map((tab, index) => (
          <Tab 
          key={index} 
          label={tab.label} 
          {...a11yProps(index)} 
          sx={{
              '&.Mui-selected': {
                color: russianViolet,
              },
            }}
            />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default VerticalTabs;