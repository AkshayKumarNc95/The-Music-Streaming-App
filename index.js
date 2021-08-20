import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route , Switch} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise";

// Custom components
import RegisterContainer from "./src/Containers/login-containers/RegisterContainer.js";
import InfoContainer from "./src/Containers/mini-containers/common/ArtistInfoContainer";
import LoginContainer from "./src/Containers/login-containers/LoginContainer";
import HomePage from "./src/Containers/HomePageContainer";
import ArtistsPage from "./src/Containers/ArtistsPageContainer";
import AlbumsPage from "./src/Containers/AlbumsPageContainer";
import { LayOut } from "./src/Components/HOC/Layout";
import reducers from "./src/Store/Reducers";
import "./index.scss";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


render(
  <div>
    <Provider
      store={createStore(
        reducers,
        composeEnhancers(applyMiddleware(thunk, promiseMiddleware))
      )}
    >
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/register">
              <RegisterContainer />
            </Route>
            <Route path="/login">
              <LoginContainer />
            </Route>

            <LayOut>
              <InfoContainer />
              <Route path="/albums" component={AlbumsPage} />
              <Route path="/artists" component={ArtistsPage} />
              <Route exact path="/" component={HomePage} />
            </LayOut>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  </div>,
  document.getElementById("app")
);
