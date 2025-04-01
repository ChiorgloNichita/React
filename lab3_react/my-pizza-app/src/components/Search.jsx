import '../styles/Search.css';

/**
 * Компонент поиска для фильтрации списка пицц по названию.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.onSearch - Функция, которая вызывается при изменении значения поиска.
 *
 * @returns {JSX.Element} Разметка компонента Search.
 * @example
 * return <Search onSearch={handleSearch} />;
 */
function Search({ onSearch }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Поиск..."
      onChange={handleSearchChange}
    />
  );
}

export default Search;
