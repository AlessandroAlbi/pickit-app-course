import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AccountModal from './AccountModal';

// Mock delle icone MUI, sostituendole con componenti vuote
vi.mock('@mui/icons-material/Close', () => ({ default: () => null }));
vi.mock('@mui/icons-material/Person', () => ({ default: () => null }));
vi.mock('@mui/icons-material/Edit', () => ({ default: () => null }));
vi.mock('@mui/icons-material/Save', () => ({ default: () => null }));
vi.mock('@mui/icons-material/Cancel', () => ({ default: () => null }));
vi.mock('@mui/icons-material/AccountCircle', () => ({ default: () => null }));

// Mock funzione di chiusura
const onCloseMock = vi.fn();

describe('AccountModal Component', () => {
  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it('should render the modal', async () => {
    render(<AccountModal open={true} onClose={onCloseMock} />);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });
  });

  // Test 1: Check the fields are not editable if edit button is not clicked
  it('should have disabled fields when not in edit mode', async () => {
    render(<AccountModal open={true} onClose={onCloseMock} />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    // Check that the Edit Profile button is visible
    const editButton = screen.getByRole('button', { name: /edit profile/i });
    expect(editButton).toBeInTheDocument();

    // All text fields should be disabled
    const firstNameField = screen.getByLabelText(/first name/i);
    const lastNameField = screen.getByLabelText(/last name/i);
    const emailField = screen.getByLabelText(/email/i);
    const phoneField = screen.getByLabelText(/phone/i);
    const companyField = screen.getByLabelText(/company/i);
    const roleField = screen.getByLabelText(/role/i);
    const bioField = screen.getByLabelText(/bio/i);

    expect(firstNameField).toBeDisabled();
    expect(lastNameField).toBeDisabled();
    expect(emailField).toBeDisabled();
    expect(phoneField).toBeDisabled();
    expect(companyField).toBeDisabled();
    expect(roleField).toBeDisabled();
    expect(bioField).toBeDisabled();
  });

  // Test 2: Check the fields are enabled if click on edit
  it('should enable fields when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<AccountModal open={true} onClose={onCloseMock} />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    // Click the Edit Profile button
    const editButton = screen.getByRole('button', { name: /edit profile/i });
    await user.click(editButton);

    // All text fields should now be enabled
    const firstNameField = screen.getByLabelText(/first name/i);
    const lastNameField = screen.getByLabelText(/last name/i);
    const emailField = screen.getByLabelText(/email/i);
    const phoneField = screen.getByLabelText(/phone/i);
    const companyField = screen.getByLabelText(/company/i);
    const roleField = screen.getByLabelText(/role/i);
    const bioField = screen.getByLabelText(/bio/i);

    expect(firstNameField).not.toBeDisabled();
    expect(lastNameField).not.toBeDisabled();
    expect(emailField).not.toBeDisabled();
    expect(phoneField).not.toBeDisabled();
    expect(companyField).not.toBeDisabled();
    expect(roleField).not.toBeDisabled();
    expect(bioField).not.toBeDisabled();

    // Save and Cancel buttons should be visible
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  // Test 3: Check the fetch of the data
  it('should fetch and display account data when modal opens', async () => {
    render(<AccountModal open={true} onClose={onCloseMock} />);
    
    // Initially should show loading spinner
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    // Verify that the fetched data is displayed
    const firstNameField = screen.getByLabelText(/first name/i);
    const lastNameField = screen.getByLabelText(/last name/i);
    const emailField = screen.getByLabelText(/email/i);
    const phoneField = screen.getByLabelText(/phone/i);
    const companyField = screen.getByLabelText(/company/i);
    const roleField = screen.getByLabelText(/role/i);
    const bioField = screen.getByLabelText(/bio/i);

    expect(firstNameField).toHaveValue('John');
    expect(lastNameField).toHaveValue('Maverick');
    expect(emailField).toHaveValue('john.maverick@example.com');
    expect(phoneField).toHaveValue('+1 (555) 987-6543');
    expect(companyField).toHaveValue('Acme Corp');
    expect(roleField).toHaveValue('Senior Software Engineer');
    expect(bioField).toHaveValue('Passionate developer with 8+ years of experience in React and Node.js.');
  });

  // Test 4: Check the update on save
  it('should update data when save button is clicked', async () => {
    const user = userEvent.setup();
    render(<AccountModal open={true} onClose={onCloseMock} />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    // Click the Edit Profile button
    const editButton = screen.getByRole('button', { name: /edit profile/i });
    await user.click(editButton);

    // Modify some fields
    const firstNameField = screen.getByLabelText(/first name/i);
    const bioField = screen.getByLabelText(/bio/i);

    await user.clear(firstNameField);
    await user.type(firstNameField, 'Jane');

    await user.clear(bioField);
    await user.type(bioField, 'Updated bio text');

    // Click the Save button
    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/account information updated successfully/i)).toBeInTheDocument();
    });

    // Edit mode should be disabled
    expect(screen.getByRole('button', { name: /edit profile/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /save/i })).not.toBeInTheDocument();

    // Fields should be disabled again
    expect(firstNameField).toBeDisabled();
    expect(bioField).toBeDisabled();

    // Updated values should be preserved
    expect(firstNameField).toHaveValue('Jane');
    expect(bioField).toHaveValue('Updated bio text');
  });
});
