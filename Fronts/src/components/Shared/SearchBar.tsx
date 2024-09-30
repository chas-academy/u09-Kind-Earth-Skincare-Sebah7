import { useState } from "react";
import { CiFilter, CiSearch} from "react-icons/ci";
import { TiDelete } from "react-icons/ti";


function SearchBar () {

  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>

    <form action="searchForm" className="flex flex-grow flex-wrap items-center justify-between gap-x-1.5 gap-y-1.5 rounded-[40px] border border-solid border-x-clayAsh border-y-clayAsh pb-1.5 pl-3 pr-[17px] pt-2 focus-within:[box-shadow:0_0_4px_#1e40af] min-[362px]:flex-nowrap">
      <button value={filterQuery} 
      onClick={() => setFilterQuery(filterQuery)}
      className="flex flex-col bg-transparent border-transparent">
        <CiFilter className="text-formSecondaryText h-5 w-6" />
      </button>
      <input className="font-sans flex w-24 min-w-0 flex-shrink-0 flex-grow text-xl leading-none tracking-[0px] text-black/40 drop-shadow-lg bg-transparent border-transparent"
            placeholder="Search..."
            id="search-query"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
      />{" "}
       <button className="flex flex-col bg-transparent border-transparent">
        <TiDelete className="text-formSecondaryText h-5 w-6" />
      </button>
      <button type="submit" 
      value={searchResults} onClick={() => setSearchResults(searchResults)}
      className="flex flex-col bg-transparent border-transparent">
        <CiSearch className="text-formSecondaryText h-5 w-6" />
      </button>
    </form>
</>
  );
}

export default SearchBar;