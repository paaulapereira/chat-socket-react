import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

const Information = ({ room }) => (
  <div className="info">
    <div className="left">
      <FontAwesomeIcon
        icon={faCircle}
        className="online"
        size="xs"
        color="lightgreen"
      />
      <h3>{room}</h3>
    </div>
    <div className="right">
      <a href="/" className="exit">
        <FontAwesomeIcon icon={faTimes} size="lg" color="white" />
      </a>
    </div>
  </div>
);

export default Information;
