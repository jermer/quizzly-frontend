import { useState } from "react";
import "./SearchForm.css";

/** Search widget.
 * Appears alongside QuizList so that results can be filtered.
 */

function SearchForm({ handleSearch }) {
    // console.debug("SearchForm", "searchFor=", typeof searchFor);

    const [searchTerm, setSearchTerm] = useState("");

    /** Tell parent to filter */
    function handleSubmit(evt) {
        // take care of accidentally trying to search for just spaces
        evt.preventDefault();
        handleSearch(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    /** Update form fields */
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    return (
        <div className="SearchForm mb-4">
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
                        value={searchTerm}
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
                {/* <input
                    className="form-control form-control-lg flex-grow-1"
                    name="searchTerm"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-lg btn-primary">
                    Submit
                </button> */}
            </form>
        </div>
    );
}

export default SearchForm;
