import React, { useEffect, useState } from "react";
import Button from "../Shared/Button";

interface FilterComponentProps {
  filters: { [key: string]: string };
  setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
}

const FilterComponent: React.FC<FilterComponentProps> = ({filters, setFilters, handleSubmit, }) => {
   const [enumValues, setEnumValues] = useState({
    categories: [] as string[],
    criteria: [] as string[],
    skinTypes: [] as string[],
    skinConcerns: [] as string[],
  });  
  const [loading, setLoading] = useState<boolean>(true);
  
  const [localFilters, setLocalFilters] = useState<{ [key: string]: string | string[] }>({
    ...filters,
  });

  useEffect(() => {
    const fetchEnums = async () => {
      try {
        const response = await fetch("https://u09-kind-earth-skincare-sebah7-4.onrender.com/api/products/enums");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEnumValues({
          categories: data.categories || [],
          criteria: data.criteria || [],
          skinTypes: data.skinTypes || [],
          skinConcerns: data.skinConcerns || [],
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnums();
  }, []);

  const handleCheckboxChange = ( e: React.ChangeEvent<HTMLInputElement>, filterCategory: string ) => {
    const { value, checked } = e.target;

    setLocalFilters((prevFilters) => {
      const updatedValues = checked
        ? [...(Array.isArray(prevFilters[filterCategory]) ? prevFilters[filterCategory] : []), value]
        : prevFilters[filterCategory] ? (prevFilters[filterCategory] as string[]).filter((v) => v !== value) : [];
      return { ...prevFilters, [filterCategory]: updatedValues };
    });
  };

  const applyFilters = () => {
    const sanitizedFilters = Object.fromEntries(
      Object.entries(localFilters).map(([key, value]) => [key, Array.isArray(value) ? value.join(",") : value])
    );
    setFilters(sanitizedFilters);
    const form = document.createElement('form');
    const event = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(event);
    handleSubmit(event as unknown as React.FormEvent);
  };

  if (loading) {
    return <p>Loading filters...</p>;
  }

return (
    <div>
      <h2>Filter Products</h2>

<div className="flex justify-around">
      <div>
        <label>Categories:</label>
        {enumValues.categories.map((cat) => (
          <div key={cat}>
            <input
              type="checkbox"
              id={cat}
              name="categories"
              value={cat}
              checked={Array.isArray(localFilters.categories) && localFilters.categories.includes(cat)}
              onChange={(e) => handleCheckboxChange(e, "categories")}
            />
            <label htmlFor={cat}>{cat}</label>
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="criteria">Criteria:</label>
        {enumValues.criteria.map((cri) => (
          <div key={cri}>
        <input
        type="checkbox"
              id={cri}
              name="criteria"
              value={cri}
              checked={Array.isArray(localFilters.criteria) && localFilters.criteria.includes(cri)}
              onChange={(e) => handleCheckboxChange(e, "criteria")}
        />
                    <label htmlFor={cri}>{cri}</label>
        </div>
         ))}
      </div>

      <div>
        <label htmlFor="skinTypes">Skin Types:</label>
        {enumValues.skinTypes.map((skt) => (
          <div key={skt}>
        <input
        type="checkbox"
              id={skt}
              name="skinTypes"
              value={skt}
              checked={Array.isArray(localFilters.skinType) && localFilters.skinType.includes(skt)}
              onChange={(e) => handleCheckboxChange(e, "skinTypes")}
        />
        <label htmlFor={skt}>{skt}</label>
</div>
 ))}
      </div>

      <div>
        <label htmlFor="skinConcerns">Skin Concerns:</label>
        {enumValues.skinConcerns.map((skc) => (
          <div key={skc}>
        <input
        type="checkbox"
              id={skc}
              name="skinConcerns"
              value={skc}
              checked={Array.isArray(localFilters.skinConcerns) && localFilters.skinConcerns.includes(skc)}
              onChange={(e) => handleCheckboxChange(e, "skinConcerns")}
        />
        <label htmlFor={skc}>{skc}</label>
</div>
 ))}
      </div>

      </div>
<div className="border rounded-md p-1 mt-2">
      <Button text="Apply Filters" onClick={applyFilters}/>
      {/* <button onClick={applyFilters} className="border rounded-md p-1 mt-2">
        Apply Filters
      </button> */}
      </div>
    </div>
  );
};

export default FilterComponent;