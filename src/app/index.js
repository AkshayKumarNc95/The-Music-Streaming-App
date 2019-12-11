import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route , Switch} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
// Custom components
import HomePage from "./Containers/HomePageContainer";
import ArtistsPage from "./Containers/ArtistsPageContainer";
import AlbumsPage from "./Containers/AlbumsPageContainer";
import { LayOut } from "./Components/HOC/Layout";
import "./index.scss";
import reducers from "./Store/Reducers";
import RegisterContainer from "./Containers/login-containers/RegisterContainer.js";
import InfoContainer from "./Containers/mini-containers/common/ArtistInfoContainer";
import LoginContainer from "./Containers/login-containers/LoginContainer";

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
          {/* <Route exact path="/">
            <LayOut>
              <HomePage />
            </LayOut>
          </Route>
          <Route path="/albums">
            <LayOut>
              <AlbumsPage />
            </LayOut>
          </Route>
          <Route path="/artists">
            <LayOut>
              <ArtistsPage />
            </LayOut>
          </Route> */}
          {/* <ArtistInfoContainer /> */}
          {/* <Route exact path="/" component={HomePage} /> */}
          {/* <Route path="/albums" component={AlbumsPage} /> */}
          {/* <Route path="/artists" component={ArtistsPage} /> */}
        </div>
      </BrowserRouter>
    </Provider>
  </div>,
  document.getElementById("app")
);
