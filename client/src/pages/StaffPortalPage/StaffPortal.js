import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventIcon from '@mui/icons-material/Event'; // New icon import

const StaffPortal = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', height: '100vh' }}>
    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
      <Card style={{ flex: 1, margin: '10px', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <PeopleIcon style={{ fontSize: 100, marginBottom: '20px' }} />
          <Typography variant="h5" component="div">
            Customer Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your customers here.
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button size="small" component={Link} to="/customer_management">Go to Customer Management</Button>
        </CardActions>
      </Card>
      <Card style={{ flex: 1, margin: '10px', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <BusinessIcon style={{ fontSize: 100, marginBottom: '20px' }} />
          <Typography variant="h5" component="div">
            Business Report
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View your business reports here.
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button size="small" component={Link} to="/business_report">Go to Business Report</Button>
        </CardActions>
      </Card>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
      <Card style={{ flex: 1, margin: '10px', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <DirectionsCarIcon style={{ fontSize: 100, marginBottom: '20px' }} />
          <Typography variant="h5" component="div">
            Manage Cars
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your cars here.
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button size="small" component={Link} to="/manage_cars">Go to Manage Cars</Button>
        </CardActions>
      </Card>
      <Card style={{ flex: 1, margin: '10px', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <EventIcon style={{ fontSize: 100, marginBottom: '20px' }} />
          <Typography variant="h5" component="div">
            Reservation Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your reservations here.
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button size="small" component={Link} to="/reservation_management">Go to Reservation Management</Button>
        </CardActions>
      </Card>
    </div>
  </div>
);

export default StaffPortal;
