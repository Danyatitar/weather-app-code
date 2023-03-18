import React from "react";

import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import Form from "./components/Form/Form";
import Error from "./components/Error/Error";
import useForm from "./hooks/useForm";
import CardList from "./components/CardList/CardList";
import BackButton from "./components/BackButton/BackButton";
import Modal from "./components/Modal/Modal";
import useForecast from "./hooks/useForecst";
function App() {
  const {
    isComplete,
    isError,
    isLoading,
    forecast,
    location,
    search,
    back,
    searchGeo,
  } = useForm();
  const { more, close, details, card, hourly } = useForecast();

  return (
    <div className="App">
      <Header></Header>

      <div className="form">
        {!isLoading && !isComplete ? (
          <Form search={search} searchGeo={searchGeo}></Form>
        ) : isLoading && !isComplete ? (
          <Loader></Loader>
        ) : (
          ""
        )}
        {isError ? <Error></Error> : ""}
        {isComplete ? (
          <CardList
            forecast={forecast}
            location={location}
            more={more}
          ></CardList>
        ) : (
          ""
        )}
      </div>
      {isComplete ? <BackButton back={back}></BackButton> : ""}
      <Modal
        hourly={hourly}
        forecast={forecast.daily[card]}
        location={location}
        close={close}
        details={details}
      ></Modal>
    </div>
  );
}

export default App;
