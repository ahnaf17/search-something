import { FC } from 'react';
import { Product } from 'models/Product';

const ProductSummary: FC<{ product: Product }> = ({ product }) => (
  <div className="flex p-[10px] w-full md:w-[50%]">
    <div className="flex p-[14px] w-full rounded-2xl bg-red-50 md:p-[18px]">
      <div className="rounded-lg w-[50px] h-[50px] md:w-[80px] md:h-[80px]">
        <img className="w-full h-full object-cover rounded-md" src={product.thumbnail} alt={`${product.title} thumbnail`} />
      </div>
      <div className="flex flex-col justify-between ml-[6px] text-black text-base text-sm md:text-lg">
        <div className="flex-1">{product.title}</div>
        <div className="text-gray-600 font-medium">{`$${product.price}`}</div>
      </div>
    </div>
  </div>
);

export default ProductSummary;
