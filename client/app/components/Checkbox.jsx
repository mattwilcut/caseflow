import React from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component {
  onChange = (event) => {
    this.props.onChange(event.target.checked);
  }

  render() {
    let {
      label,
      name,
      required,
      value,
      disabled,
      id,
      errorMessage
    } = this.props;

    let classNames = [
      'cf-form-checkboxes',
      `checkbox-wrapper-${name}`
    ];

    if (errorMessage) {
      classNames.push('usa-input-error');
    }

    return <div className={classNames.join(' ')}>

      {errorMessage && <div className="usa-input-error-message">{errorMessage}</div>}

      <div className="cf-form-checkbox">
        <input
          name={name}
          onChange={this.onChange}
          type="checkbox"
          id={id || name}
          checked={value}
          disabled={disabled}
        />
        <label className="question-label" htmlFor={name}>
          {label || name} {required && <span className="cf-required">Required</span>}
        </label>
      </div>
    </div>;
  }
}
Checkbox.defaultProps = {
  required: false
};

Checkbox.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.bool
};
