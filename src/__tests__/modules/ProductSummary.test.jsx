/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductSummary from 'modules/ProductSummary';

const mockProduct = {
  id: 1,
  title: 'Product',
  thumbnail: 'thumb.jpg',
  price: 100,
};

describe('ProductSummary Component', () => {
  test('renders product details correctly', () => {
    render(<ProductSummary product={mockProduct} />);

    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();

    const imgElement = screen.getByAltText('Product thumbnail');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'thumb.jpg');
  });
});
