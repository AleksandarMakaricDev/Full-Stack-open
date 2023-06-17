import React from "react";
import {
  isNonEmptyArray,
  isObject,
  isValidNonEmptyString,
} from "../../utils/validators";
import Weather from "../Weather/Weather";

const Country = ({
  country: { name, capitals, area, languages, flag, alt },
  onSuccess,
  onError,
}) => {
  const formatLanguages = () => {
    if (isObject(languages)) {
      return Object.values(languages);
    }
    return null;
  };

  return (
    <div>
      {name && <h2>{name}</h2>}
      {isNonEmptyArray(capitals) && (
        <p>
          <b>{capitals.length > 1 ? "Capitals: " : "Capital: "}</b>
          {capitals.join(", ")}
        </p>
      )}
      {typeof area === "number" && (
        <p>
          <b>Area: </b>
          {area}km<sup>2</sup>
        </p>
      )}
      {formatLanguages() ? (
        <>
          <p>
            <b>Languages: </b>
          </p>
          <ul>
            {formatLanguages().map((l, index) => (
              <li key={index}>{l}</li>
            ))}
          </ul>
        </>
      ) : null}
      {isValidNonEmptyString(flag) && (
        <img src={flag} alt={alt || "Country flag."} />
      )}
      {isNonEmptyArray(capitals) && (
        <Weather
          capital={capitals[0]}
          onSuccess={onSuccess}
          onError={onError}
        />
      )}
    </div>
  );
};

export default Country;
