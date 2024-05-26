import searchProduct from 'lib/rest/SearchProduct';
import { Product } from 'models/Product';
import { FC, useState } from 'react';
import SearchBar from 'lib/components/SearchBar';
import LoadStatus from 'lib/LoadStatus';
import { Message, MessageType } from 'models/Message';
import ProductSummary from 'modules/ProductSummary';

const Shop: FC = () => {
  const [results, setResults] = useState<Product[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.IDLE);
  const [message, setMessage] = useState<Message | null>(null);

  const validateSearchInput = (searchInput:string): Boolean => (searchInput.length >= 3);

  const findProducts = async (event: any) => {
    const searchInput = event.target.value.trim();
    setResults([]);
    setMessage(null);
    if (searchInput) {
      const isValid = validateSearchInput(searchInput);
      if (isValid) {
        setLoadStatus(LoadStatus.LOADING);
        await searchProduct(searchInput)
          .then((products) => {
            setLoadStatus(LoadStatus.SUCCESS);
            if (products.length) {
              setResults(products);
            } else {
              setMessage({ value: 'No product found from this search', type: MessageType.WARNING });
            }
          })
          .catch((err) => {
            setLoadStatus(LoadStatus.FAILURE);
            setMessage({ value: 'Failed to fetch data', type: MessageType.ERROR });
          });
      } else {
        setMessage({ value: 'Atleast 3 characters required to search', type: MessageType.WARNING });
      }
    }
  };

  const debounce = (callback: any, delay: number = 1000) => {
    let timeoutId: any;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(...args), delay);
    }
  };

  const handleSearch = debounce(findProducts)

  return (
    <div>
      <div className="flex flex-col">
        <SearchBar onSearch={handleSearch} placeholder="Search Title" />
        <div className="w-full mt-[10px] flex flex-wrap h-[90%] overflow-y-scroll">
          {results.map((product) => (
            <ProductSummary key={product.id} product={product} />
          ))}
          {loadStatus === LoadStatus.LOADING && <div className="w-full text-center mt-[2%]">Loading ...</div>}
          {message && <div className="w-full text-center mt-[2%] font-sans italic">{message.value}</div>}
        </div>
      </div>
    </div>
  );
};

export default Shop;
