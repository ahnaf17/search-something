import React, { FC } from 'react';

const SearchBar: FC<{ onSearch: (event:any) => void, placeholder: string }> = ({ onSearch, placeholder }) => (
  <input
    className="w-full px-[4%] h-[45px] bg-black bg-opacity-75 rounded-xl border-0 text-white text-lg md:rounded-2xl md:px-[3%] md:text-xl md:h-[60px]"
    placeholder={placeholder}
    onChange={onSearch}
  />
);

export default SearchBar;
