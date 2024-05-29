import { Product } from 'models/Product';
import productResponseParser from 'lib/parser/ProductResponseParser';
import { Method, call } from './RestRequest';

const parseResponse = (response: any): Product[] =>
  response.products.length
    ? response.products.map(
        (product: any): Product => productResponseParser(product),
      )
    : [];

const searchProduct = async (query: string): Promise<Product[]> => {
  const term = query
    .split(' ')
    .filter((word) => word !== '')
    .join('+');
  const url = `https://dummyjson.com/products/search?q=${term}`;
  const response = await call(Method.GET, url, null);
  return parseResponse(response);
};

export default searchProduct;
