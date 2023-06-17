const Filter = ({ filterQuery, handleFilterQuery, disabled }) => {
  return (
    <>
      <label>Filter contacts by name: </label>
      <input
        type="search"
        value={filterQuery}
        onChange={handleFilterQuery}
        disabled={disabled}
        placeholder={disabled ? "No contacts to filter" : ""}
      />
    </>
  );
};

export default Filter;
