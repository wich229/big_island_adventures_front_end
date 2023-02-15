import FilterCheckbox from "./FilterCheckbox";
/* CODE SOURCE: https://codesandbox.io/s/y3vbc?file=/src/App.js:0-1793 */
    

const FilterCheckboxes =({filterOptions, selectedFilters, setSelectedFilters}) => {
        const filterEntries = Object.entries(filterOptions)
        const handleFilterChange = (event) => {
        const { name, value, checked } = event.target;

        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked ? [...(prevFilters[name] || []), value] : prevFilters[name].filter((option) => option !== value),
        }));
        };
    
        return (
        <div>
            {filterEntries.map(([category, options]) => (
            <div key={category}>
                <h3>{category}</h3>
                {options.map((option) => (
                <FilterCheckbox
                    key={option}
                    category={category}
                    option={option}
                    checked={selectedFilters[category]?.includes(option)}
                    onChange={handleFilterChange}
                />
                ))}
            </div>
            ))}
        </div>
        );
    }


    export default FilterCheckboxes;

