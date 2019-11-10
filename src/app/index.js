import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// Custom components
import HomePage from "./Containers/HomePage.js";
import ArtistsPage from "./Containers/ArtistsPage.js";
import AlbumsPage from "./Containers/AlbumsPage.js";
import { DesktopContainer } from "./Components/HOC/Layout";
import "./index.scss";
import reducers from './Store/Reducers';

render(
  <div>
    <Provider store = {createStore(reducers,applyMiddleware(thunk))}>
      <BrowserRouter>
        <div>
          <DesktopContainer>
            <Route exact path="/" component={HomePage} />
            <Route path="/albums" component={AlbumsPage} />
            <Route path="/artists" component={ArtistsPage} />
          </DesktopContainer>
        </div>
      </BrowserRouter>
    </Provider>
  </div>,
  document.getElementById("app")
);
