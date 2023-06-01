import { useState, useEffect } from "react";
import { useJobProvider } from "../../Providers/JobProvider";
import FilterBar from "./FilterBar";
import { handleSearchBar } from "./Functions/SearchBarFunctions";
import { searchIcon } from "./Data/Icons";
import "./SearchBar.css";

function SearchBar() {
  const { setJobs, searchResult } = useJobProvider();
  const [search, setSearch] = useState("");
  const [searchOptions, setSearchOptions] = useState({
    searchbar: "",
    isRemote: false,
    city: "",
    skills: [],
  });

  function handleSearch() {
    if (
      searchOptions.search === "" &&
      !searchOptions.isRemote &&
      searchOptions.dropdown === ""
    ) {
      setJobs(searchResult);
    }
    let filterSearch = searchResult;
    if (searchOptions.searchbar) {
      const textFilter = filterSearch.filter((obj) => {
        const { title, company, details, job_id, city } = obj;
        const joinSearch = search.replaceAll(" ", "");
        const regex = new RegExp(joinSearch, "gi");
        let joinText = [
          title.replaceAll(" ", ""),
          company.replaceAll(" ", ""),
          details.replaceAll(" ", ""),
          city.replaceAll(" ", ""),
        ];

        const matchExp = [];
        const trackJobID = [];
        for (let i = 0; i < joinText.length; i++) {
          if (joinText[i].match(regex) && !trackJobID.includes(job_id)) {
            trackJobID.push(job_id);
            matchExp.push(obj);
          }
        }
        return matchExp.length > 0;
      });
      filterSearch = textFilter;
    }
    if (searchOptions.isRemote) {
      const remoteFilter = filterSearch.filter(
        ({ full_remote }) => full_remote === true
      );
      filterSearch = remoteFilter;
    }
    if (searchOptions.city) {
      const cityFilter = filterSearch.filter(
        ({ city }) => city.split(",")[0] === searchOptions.city
      );
      filterSearch = cityFilter;
    }
    if (searchOptions.skills.length > 0) {
      const skillFilter = filterSearch.filter((obj) => {
        let includesAll = true;
        for (let i = 0; i < searchOptions.skills.length; i++) {
          if (!obj["skill_id"].includes(searchOptions.skills[i])) {
            includesAll = false;
            break;
          }
        }
        if (includesAll) {
          return obj;
        }
      });
      filterSearch = skillFilter;
    }
    setJobs(filterSearch);
  }

  useEffect(() => {
    handleSearch();
  }, [
    searchOptions.searchbar,
    searchOptions.city,
    searchOptions.isRemote,
    searchOptions.skills.length,
  ]);

  return (
    <section className="search-component">
      <label htmlFor={search}>
        {searchIcon}
        <input
          className="searchbar"
          type="text"
          id="searchbar"
          value={search}
          placeholder="Search Jobs..."
          onChange={(event) =>
            handleSearchBar(
              event,
              search,
              setSearch,
              searchOptions,
              setSearchOptions
            )
          }
        />
      </label>
      <FilterBar
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
      />
    </section>
  );
}

export default SearchBar;
