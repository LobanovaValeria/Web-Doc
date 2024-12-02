import * as React from 'react';
import axios from 'axios';
import { useTheme, AppBar, Tabs, Tab, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import FormApp from '../../components/formApp/FormApp';
import PivotTable from '../../components/PivotTable/PivotTable';
import { resources } from '../../resources/resources';
import './appDoc.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function AppDoc() {
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const resUsers = await axios.get('http://localhost:3001/users');
      const resApp = await axios.get('http://localhost:3001/users');
      setUsers(resUsers.data);
      setApplications(resApp.data);
    };
    fetchUsers();
  }, []);

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={resources.form.title} {...a11yProps(0)} />
          <Tab label={resources.table.tableTitle} {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <div className="TabPanel">
          <FormApp users={users} applications={applications} />
        </div>
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        <div className="wrapper_table">
          <PivotTable />
        </div>
      </TabPanel>
    </>
  );
}
