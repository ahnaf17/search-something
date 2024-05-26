import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Shop from 'modules/Shop';
import searchProduct from 'lib/rest/SearchProduct';
import { jest } from '@jest/globals';


jest.mock('lib/rest/SearchProduct');

const mockProducts = [
  { id: 1, title: 'Product 1', thumbnail: 'thumb1.jpg', price: 100 },
  { id: 2, title: 'Product 2', thumbnail: 'thumb2.jpg', price: 200 },
];

describe('Shop Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers(); 
  });

  test('renders search bar component', () => {
    render(<Shop />);
    expect(screen.getByPlaceholderText('Search Title')).toBeInTheDocument();
  });

  
  test('displays loading spinner and fetches products on valid input', async () => {
    searchProduct.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockProducts);
        }, 1000);
      });
    });
    
    render(<Shop />);
    const input = screen.getByPlaceholderText('Search Title');
    fireEvent.change(input, { target: { value: 'abc' } });

    jest.advanceTimersByTime(500);
    await waitFor(() => {
      expect(screen.getByText('Loading ...')).toBeInTheDocument();
    });
    
    jest.advanceTimersByTime(2000);
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });
  
  test('displays warning message for input less than 3 characters', async () => {
    render(<Shop />);
    const input = screen.getByPlaceholderText('Search Title');
    
    fireEvent.change(input, { target: { value: 'ab' } });
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText('Atleast 3 characters required to search')).toBeInTheDocument();
    });
  });

  test('displays no results message when no products found', async () => {
    searchProduct.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([]);
        }, 1000);
      });
    });

    render(<Shop />);
    const input = screen.getByPlaceholderText('Search Title');
    fireEvent.change(input, { target: { value: 'abc' } });

    jest.advanceTimersByTime(500);
    await waitFor(() => {
      expect(screen.getByText('Loading ...')).toBeInTheDocument();
    });

    jest.advanceTimersByTime(2000);
    await waitFor(() => {
      expect(screen.getByText('No product found from this search')).toBeInTheDocument();
    });
  });

  test('displays error message on search failure', async () => {
    searchProduct.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject();
        }, 1000);
      });
    });

    render(<Shop />);
    const input = screen.getByPlaceholderText('Search Title');
    fireEvent.change(input, { target: { value: 'abc' } });

    jest.advanceTimersByTime(500);
    await waitFor(() => {
      expect(screen.getByText('Loading ...')).toBeInTheDocument();
    });

    jest.advanceTimersByTime(2000);
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
    });
  });

  test('debounce function calls searchProduct once after multiple triggers', async () => {
    searchProduct.mockResolvedValueOnce(mockProducts);
    
    render(<Shop />);
    const input = screen.getByPlaceholderText('Search Title');

    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.change(input, { target: { value: 'abc' } });

    jest.advanceTimersByTime(2000);
    await waitFor(() => {
      expect(searchProduct).toHaveBeenCalledTimes(1);
    });
  });
});