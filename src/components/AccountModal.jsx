import { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Grid,
  Chip,
  Alert,
  Tab,
  Tabs,
  Stack,
  CircularProgress,
} from '@mui/material';
// import {
//   Close as CloseIcon,
//   Person as PersonIcon,
//   Edit as EditIcon,
//   Save as SaveIcon,
//   Cancel as CancelIcon,
//   AccountCircle,
// } from '@mui/icons-material';

import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircle from '@mui/icons-material/AccountCircle';

// TabPanel component defined outside to prevent re-creation on every render
const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const AccountModal = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    bio: '',
  });

  // Fetch user data when modal opens
  useEffect(() => {
    const fetchAccountData = async () => {
      if (!open) return;

      setIsLoading(true);
      try {
        const response = await fetch('https://api.example.com/account');
        if (!response.ok) {
          throw new Error('Failed to fetch account data');
        }
        const result = await response.json();
        if (result.success && result.data) {
          setFormData({
            firstName: result.data.firstName || '',
            lastName: result.data.lastName || '',
            email: result.data.email || '',
            phone: result.data.phone || '',
            company: result.data.company || '',
            role: result.data.role || '',
            bio: result.data.bio || '',
          });
        }
      } catch (error) {
        console.error('Error fetching account data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountData();
  }, [open]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSave = async () => {
    try {
      console.log('Saving form data:', formData);
      const response = await fetch('https://api.example.com/account', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update account');
      }

      const result = await response.json();
      console.log('Account updated:', result);

      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating account:', error);
      // You could add error handling UI here
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 600, md: 700 },
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    overflow: 'auto',
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='account-modal-title'
      aria-describedby='account-modal-description'
    >
      <Box sx={modalStyle}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5' component='h2' id='account-modal-title'>
            Account Settings
          </Typography>
          <IconButton onClick={onClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Success Alert */}
        {showSuccess && (
          <Box sx={{ px: 3, pt: 2 }}>
            <Alert severity='success' onClose={() => setShowSuccess(false)}>
              Account information updated successfully!
            </Alert>
          </Box>
        )}

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label='account tabs'
          >
            <Tab icon={<AccountCircle />} label='Profile' />

          </Tabs>
        </Box>

        {/* Profile Tab */}
        <TabPanel value={activeTab} index={0}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Stack spacing={3}>
              {/* Avatar Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}
                  src='/path-to-avatar.jpg'
                >
                  <PersonIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Box>
                  <Typography variant='h6'>
                    {formData.firstName} {formData.lastName}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {formData.role} at {formData.company}
                  </Typography>
                  <Chip
                    label='Active'
                    color='success'
                    size='small'
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  {!isEditing ? (
                    <Button
                      startIcon={<EditIcon />}
                      variant='outlined'
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Stack direction='row' spacing={1}>
                      <Button
                        startIcon={<SaveIcon />}
                        variant='contained'
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        startIcon={<CancelIcon />}
                        variant='outlined'
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  )}
                </Box>
              </Box>

              <Divider />

              {/* Form Fields */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='First Name'
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    disabled={!isEditing}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Last Name'
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    disabled={!isEditing}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Email'
                    type='email'
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    disabled={!isEditing}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Phone'
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    disabled={!isEditing}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Company'
                    value={formData.company}
                    onChange={handleInputChange('company')}
                    disabled={!isEditing}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Role'
                    value={formData.role}
                    onChange={handleInputChange('role')}
                    disabled={!isEditing}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Bio'
                    multiline
                    rows={3}
                    value={formData.bio}
                    onChange={handleInputChange('bio')}
                    disabled={!isEditing}
                    variant='outlined'
                    placeholder='Tell us about yourself...'
                  />
                </Grid>
              </Grid>
            </Stack>
          )}
        </TabPanel>
      </Box>
    </Modal>
  );
};

export default AccountModal;
