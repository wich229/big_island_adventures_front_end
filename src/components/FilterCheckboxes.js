import FilterCheckbox from "./FilterCheckbox";
import { Dropdown } from "react-bootstrap";
import './FilterCheckboxes.css'

const FilterCheckboxes =({filterOptions, selectedFilters, setSelectedFilters}) => {
        const filterEntries = Object.entries(filterOptions)
        const handleFilterChange = (event) => {
            const { name, value, checked } = event.target;
            setSelectedFilters((prevFilters) => ({
                ...prevFilters,
                [name]: checked ? [...(prevFilters[name] || []), value] : 
                prevFilters[name].filter((option) => option !== value),
            }));
        };

        return (
        <section className="filter-btn">
            <Dropdown><Dropdown.Toggle variant="secondary">Filter</Dropdown.Toggle>
            <Dropdown.Menu className="menu">
            {filterEntries.map(([category, options]) => (
            <section key={category}>
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
        </section>
            ))}</Dropdown.Menu></Dropdown>
        </section>
        );
    }


    export default FilterCheckboxes;

