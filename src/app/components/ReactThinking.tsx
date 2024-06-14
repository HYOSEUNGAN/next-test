import React, { useState } from 'react';

type ProductType = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
};

const PRODUCTS: ProductType[] = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
];

type ProductRowProps = {
  product: ProductType;
};

const ProductCategoryRow: React.FC<{ category: string }> = ({ category }) => {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
};

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  const name = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

type ProductTableProps = {
  products: ProductType[];
  filterText: string;
  inStockOnly: boolean;
};

const ProductTable: React.FC<ProductTableProps> = ({ products, filterText, inStockOnly }) => {
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    if (!product.name.toLowerCase().includes(filterText.toLowerCase())) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}
      />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

type SearchBarProps = {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (value: string) => void;
  onInStockOnlyChange: (value: boolean) => void;
};

// useState처럼 props도 제너릭사용
const SearchBar: React.FC<SearchBarProps> = ({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) => {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        /> Only show products in stock
      </label>
    </form>
  );
};

const FilterableProductTable: React.FC<{ products: ProductType[] }> = ({ products }) => {
  const [filterText, setFilterText] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const handleFilterTextChange = (value: string) => {
    setFilterText(value);
  };

  const handleInStockOnlyChange = (value: boolean) => {
    setInStockOnly(value);
  };

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockOnlyChange={handleInStockOnlyChange}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
};

const ReactThinking = () => {
  console.log('app');
  return <FilterableProductTable products={PRODUCTS} />;
};

export default React.memo(ReactThinking);
