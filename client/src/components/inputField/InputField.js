import React, { Component } from "react";
import "./inputfield.css";
import PropTypes from "prop-types";

class InputField extends Component {
  render() {
    return (
      <div className="input-field">
        <label>{this.props.label} : </label>
        <input
          className="input-element"
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          name={this.props.name}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

InputField.defaultProps = {
  type: "",
  placeholder: "",
  label: "",
  name: ""
};

export default InputField;
