import "../styles/Filter.css";

const Filter = () => {
  return (
    <div className="Filter">
      <div className="order-by-filter">
        Order By
        <div className="publish-insertion-date"></div>
        <div className="asc-desc"></div>
      </div>
      <div className="search-filter">
        Search
        <div className="title-author"></div>
      </div>
    </div>
  );
};

export default Filter;
