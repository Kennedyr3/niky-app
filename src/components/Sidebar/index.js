import * as React from 'react';

import App from '../../screens/homeScreen';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { BsSearch } from "react-icons/bs";

const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#eee', height: '100vh' }} >

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          xs={7} md={7}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >

        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >

        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` }, }}
      >

        <Navbar style={{ paddingBottom: 180, backgroundColor: '#162542' }} >
          <Form
            style={{
              width: 300,
              marginLeft: 40,
              marginTop: 10
            }}
            className="d-flex"
          >
            <InputGroup className="d-flex">
              <Form.Control
                style={{
                  backgroundColor: '#2A457A',
                  borderColor: '#2A457A',
                  color: '#fff',
                }}
                placeholder="Pesquisar"
              />
              <Button
                style={{
                  backgroundColor: '#2A457A',
                  borderColor: '#2A457A',
                  border: 'none',
                }}
              >
                <BsSearch style={{ marginTop: -5 }}
                />
              </Button>
            </InputGroup>
          </Form>
        </Navbar>

        <App />
      </Box>
    </Box>
  );
}
