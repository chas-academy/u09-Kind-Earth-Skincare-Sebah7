import { ChangeEvent, useState } from "react";
import { CiFilter, CiSearch} from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { Product } from "../Admin/ProductForm.interface";
import { useNavigate } from "react-router-dom";
import FilterComponent from "../Product/ProductFilter";

function SearchBar () {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<{ [key: string]: string }>({})
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const navigate = useNavigate();

 const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  if (!searchQuery&& Object.keys(filters).length === 0) return;

  try {
    const queryParams = new URLSearchParams({
            ...filters,
      name: searchQuery.toLowerCase(),
    }).toString();

    console.log("Query Params:", queryParams);

    const response = await fetch(
      `http://localhost:3000/api/products/query?${queryParams}`
    );
    const jsonData: { products: Product[] } = await response.json();
    navigate("/search-results", { state: { searchResults: jsonData.products } });
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};
  
  const handleReset = () => {
    setSearchQuery("");
    setFilters({});
  };

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