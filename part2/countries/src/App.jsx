import { useEffect, useState } from "react";
import countryServices from "./services/countries";
import Search from "./components/Search/Search";
import CountryList from "./components/CountryList/CountryList";
import Notification from "./components/Notification/Notification";
import { isNonEmptyArray } from "./utils/validators";
import { modifierStates } from "./types/constants";

let timeout;

const App = () => {
  const [searchQuery, setSearchQuery] = useState();
  const [countries, setCountries] = useState();
  const [isLoading, setIsLoading] = useState();
  const [notification, setNotification] = useState();

  const resetNotification = () => {
    timeout = setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  useEffect(() => timeout && clearTimeout(timeout), []);

  const handleError = (message) => {
    setNotification({
      message: message || "Something went wrong! Please try again in a bit.",
      type: modifierStates.error,
    });
    resetNotification();
    setSearchQuery();
  };
  const handleSuccess = (message) => {
    setNotification({
      message: message || "Success!",
      type: modifierStates.success,
    });
    resetNotification();
  };

  const handleSearchChange = ({ target: { value } }) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    setIsLoading(true);
    countryServices
      .getCountries()
      .then((fetchedCountries) => {
        let formattedCountries;

        if (isNonEmptyArray(fetchedCountries)) {
          formattedCountries = fetchedCountries.map((fC) => ({
            name: fC?.name?.common,
            capitals: fC?.capital,
            languages: fC?.languages,
            area: fC?.area,
            flag: fC?.flags?.png,
            alt: fC?.flags?.alt,
          }));
        } else {
          formattedCountries = null;
          handleError();
        }

        setCountries(formattedCountries);
      })
      .catch(() => handleError())
      .finally(() => setIsLoading(false));
  }, []);

  const getSearchedCountries = () => {
    if (searchQuery && Array.isArray(countries)) {
      return countries.filter((c) =>
        c?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return null;
  };

  return (
    <main>
      <Notification notification={notification} />
      {isLoading ? (
        <p>Fetching data...</p>
      ) : (
        <>
          <Search
            onSearchChange={handleSearchChange}
            searchValue={searchQuery}
          />
          {searchQuery ? (
            <CountryList
              countries={getSearchedCountries()}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          ) : (
            <p>Please search country by name.</p>
          )}
        </>
      )}
    </main>
  );
};

export default App;
