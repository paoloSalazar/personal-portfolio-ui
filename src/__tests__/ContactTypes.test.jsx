import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ContactTypes from '../components/ContactTypes.jsx';
import useContactTypes from '../hooks/useContactTypes.js';

// Mock the custom hook
vi.mock('../hooks/useContactTypes.js');

describe('ContactTypes Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading state initially', () => {
    useContactTypes.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<ContactTypes />);

    expect(screen.getByText('Loading contact types...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner
  });

  test('renders error state when API fails', () => {
    const errorMessage = 'Network error';
    useContactTypes.mockReturnValue({
      data: null,
      loading: false,
      error: errorMessage,
    });

    render(<ContactTypes />);

    expect(screen.getByText(`Error loading contact types: ${errorMessage}`)).toBeInTheDocument();
  });

  test('renders contact types table when data is loaded', async () => {
    const mockData = [
      { id: 1, name: 'email', description: 'Personal Email Address' },
      { id: 2, name: 'phone', description: 'Phone Number' },
    ];

    useContactTypes.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<ContactTypes />);

    // Check table headers using role
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Check table data
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
    expect(screen.getByText('Personal Email Address')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('phone')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
  });

  test('renders title correctly', () => {
    useContactTypes.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<ContactTypes />);

    expect(screen.getByText('Contact Types')).toBeInTheDocument();
  });

  test('does not render table when no data', () => {
    useContactTypes.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<ContactTypes />);

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});