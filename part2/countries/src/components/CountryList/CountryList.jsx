import React from "react";
import { isNonEmptyArray } from "../../utils/validators";
import CountryItem from "../CountryItem/CountryItem";
import Country from "../Country/Country";

const CountryList = ({ countries, onSuccess, onError }) => {
  if (isNonEmptyArray(countries)) {
    if (countries.length > 10) {
      return <p>Too many matches. Be more specific!</p>;
    } else if (countries.length > 1) {
      return (
        <ul>
          {countries.map((c) => {
            return c?.name ? (
              <CountryItem
                key={c.name}
                country={c}
                onSuccess={onSuccess}
                onError={onError}
              />
            ) : null;
          })}
        </ul>
      );
    } else {
      return (
        <Country
          country={countries[0]}
          onSuccess={onSuccess}
          onError={onError}
        />
      );
    }
  } else if (Array.isArray(countries)) {
    return <p>No country name matches the search.</p>;
  }
  return null;
};

export default CountryList;
