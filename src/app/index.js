import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
// Custom components
import HomePage from "./Containers/HomePageContainer";
import ArtistsPage from "./Containers/ArtistsPageContainer";
import AlbumsPage from "./Containers/AlbumsPageContainer";
import { LayOut } from "./Components/HOC/Layout";
import "./index.scss";
import reducers from './Store/Reducers';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

render(
  <div>
    <Provider store = {createStore(reducers,composeEnhancers(applyMiddleware(thunk)))}>
      <BrowserRouter>
        <div>
          <LayOut>
            <Route exact path="/" component={HomePage} />
            <Route path="/albums" component={AlbumsPage} />
            <Route path="/artists" component={ArtistsPage} />
          </LayOut>
        </div>
      </BrowserRouter>
    </Provider>
  </div>,
  document.getElementById("app")
);
