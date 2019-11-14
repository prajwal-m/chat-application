import React, { Fragment } from "react";
import "./button.css";
import PropTypes from "prop-types";

const Button = ({ buttonText, onClick }) => {
  return (
    <Fragment>
      <button className="common-btn" onClick={() => onClick()}>
        {buttonText}
      </button>
    </Fragment>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
  buttonText: "Button",
  onClick: () => {}
};

export default Button;
