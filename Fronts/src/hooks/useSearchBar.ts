import { Product } from "../components/Dashboard/Admin/ProductForm.interface";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export const useSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (
    event: React.FormEvent,
    filter?: { [key: string]: string }
  ) => {
    event.preventDefault();
    if (!searchQuery && Object.keys(filters).length === 0 && !filter) return;

    try {
      const queryParams = new URLSearchParams({
        ...filters,
        ...filter,
        name: searchQuery.toLowerCase(),
      }).toString();

      console.log("Query Params:", queryParams);

      const response = await fetch(
        `https://u09-kind-earth-skincare-sebah7-4.onrender.com/api/products/query?${queryParams}`
      );
      const jsonData: { products: Product[] } = await response.json();
      navigate("/search-results", {
        state: { searchResults: jsonData.products },
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setFilters({});
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    handleChange,
    handleSubmit,
    handleReset,
  };
};
