import React from 'react';

interface SearchProps {
  stroke?: string;
  fill?: string;
  width?: number;
  height?: number;
  className?: string;
}

const Search: React.FC<SearchProps> = ({
    stroke = 'currentColor',
    fill = 'none',
    width = 24,
    height = 24,
    className
  }) => (
    <svg  width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" strokeWidth={1.5} stroke={stroke}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>

  );
  

export default Search;