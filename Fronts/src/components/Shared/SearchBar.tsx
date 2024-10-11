import { useState } from "react";
import { CiFilter, CiSearch} from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import FilterComponent from "../Product/ProductFilter";
import { useSearchBar } from "../../hooks/useSearchBar";


function SearchBar() {
  const {
    searchQuery,
    handleChange,
    handleSubmit,
    handleReset,
    filters,
    setFilters,
  } = useSearchBar();

    const [showFilters, setShowFilters] = useState<boolean>(false);

  const toggleFilters = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters);
  };

  return (
    <>
    <form action="searchForm" 
    onSubmit={handleSubmit}
    className="flex flex-grow flex-wrap items-center justify-between gap-x-1.5 gap-y-1.5 rounded-[40px] border border-solid border-x-clayAsh border-y-clayAsh pb-1.5 pl-3 pr-[17px] pt-2 focus-within:[box-shadow:0_0_4px_#1e40af] min-[362px]:flex-nowrap"
    >
      <button type="button"
      onClick={toggleFilters}
       className="flex flex-col bg-transparent border-transparent transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer">
        <CiFilter className="text-formSecondaryText h-5 w-6" />
      </button>
      <input className="font-sans flex w-24 min-w-0 flex-shrink-0 flex-grow text-xl leading-none tracking-[0px] text-black/40 drop-shadow-lg bg-transparent border-transparent"
            placeholder="Search..."
            id="search-query"
            type="text"
            value={searchQuery}
            onChange={handleChange}
      />{" "}
       <button
       type="reset"
        onClick={handleReset}
       className="flex flex-col bg-transparent border-transparent transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer"
       >
        <TiDelete type="reset" className="text-formSecondaryText h-5 w-6" />
      </button>
      <button type="submit"
      className="flex flex-col bg-transparent border-transparent transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer"
      >
        <CiSearch type="submit" className="text-formSecondaryText h-5 w-6" />
      </button>
    </form>

    {showFilters && (
        <FilterComponent filters={filters} setFilters={setFilters} handleSubmit={handleSubmit}/>
      )}

</>
  );
}

export default SearchBar;