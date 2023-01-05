import React, { useState } from "react";
import PropTypes from "prop-types";

import SearchBar from "../SearchBar/SearchBar"
import SearchResults from "../SearchResults/SearchResults"

const SearchPage = () => {

  const [message, setMessage] = useState("");

  return (
    <div className="container-md mt-1">
      <div className="row">
         <div className="col-sm-5"><SearchBar class="col-4"></SearchBar></div>
         <div className="col-sm-7">
           <SearchResults></SearchResults>
         </div>
      </div>
    </div>
  );
};

SearchPage.propTypes = {};

SearchPage.defaultProps = {};

export default SearchPage;
