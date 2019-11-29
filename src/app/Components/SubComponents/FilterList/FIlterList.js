import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";

import "./FilterList.css";
import { getTracks } from "../../../Store/Actions/Tracks.js";
import { Trends, Styles } from "../../../Common/enums.js";

function getOptions(whichOne) {
  let options = [];
  if (whichOne === "Style") {
    options = [
      { key: "None", text: "None", value: Styles.none },
      {
        key: Styles.filmscore,
        text: Styles.filmscore,
        value: Styles.filmscore
      },
      { key: Styles.Groovy, text: Styles.Groovy, value: Styles.Groovy },
      { key: Styles.pop, text: Styles.pop, value: Styles.pop },
      { key: Styles.bass, text: Styles.bass, value: Styles.bass },
      {
        key: Styles.electronic,
        text: Styles.electronic,
        value: Styles.electronic
      },
      { key: Styles.dance, text: Styles.dance, value: Styles.dance },
      { key: Styles.rock, text: Styles.rock, value: Styles.rock },
      { key: Styles.voice, text: Styles.voice, value: Styles.voice }
    ];
  } else if (whichOne === "Categories") {
    options = [
      {
        key: "None",
        text: "None",
        value: Trends.none
      },
      {
        key: Trends.popularWeek,
        text: "Popular this week",
        value: Trends.popularWeek
      },
      {
        key: Trends.PopularMonth,
        text: "Popular this month",
        value: Trends.PopularMonth
      },
      { key: Trends.popular, text: "Most popular", value: Trends.popular },
      {
        key: Trends.Weeklylistens,
        text: "Most played this week",
        value: Trends.Weeklylistens
      },
      {
        key: Trends.MonthlyListens,
        text: "Most played this month",
        value: Trends.MonthlyListens
      },
      { key: Trends.listens, text: "Most played", value: Trends.listens }
    ];
  } else {
    options = [];
  }

  return options;
}

function onSelect(event, data, callBack) {
  // Call the action creator now!
  callBack(data.placeholder, data.value);
}

// Update's redux store upon select! 
function FilterList(props) {
  const { filterFor } = props;

  if (filterFor && filterFor === "TRACKLIST") {
    return (
      <div className="filter-container">
        <span>Filters:</span>
        <Dropdown
          key="x-1"
          placeholder="Style"
          fluid
          selection
          options={getOptions("Style")}
          onChange={(event, data) =>
            onSelect(event, data, props.getTracks)
          }
        />
        <Dropdown
          key="x-2"
          placeholder="Categories"
          fluid
          selection
          options={getOptions("Categories")}
          onChange={(event, data) =>
            onSelect(event, data, props.getTracks)
          }
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  getTracks,
};

export default connect(null, mapDispatchToProps)(FilterList);
