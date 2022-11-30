import { useState } from "react";
import "./SearchForm.css";

/** Search widget.
 * Appears alongside QuizList so that results can be filtered.
 */

function SearchForm({ handleSearch }) {
    // console.debug("SearchForm", "searchFor=", typeof searchFor);

    const [searchString, setSearchString] = useState("");

    /** Tell parent to filter */
    function handleSubmit(evt) {
        // take care of accidentally trying to search for just spaces
        evt.preventDefault();
        handleSearch(searchString.trim() || undefined);
        setSearchString(searchString.trim());
    }

    /** Update form fields */
    function handleChange(evt) {
        setSearchString(evt.target.value);
    }

    return (
        <div className="SearchForm">
            <div className="container my-3">
                <form className="form-inline" onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="submit-button"
                            value={searchString}
                            name="searchTerm"
                            onChange={handleChange}
                        />
                        <button
                            id="submit-button"
                            className="btn btn-primary"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SearchForm;
