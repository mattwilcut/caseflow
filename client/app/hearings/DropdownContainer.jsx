import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStateProperty } from './utils';
import * as Actions from './actions/Dockets';
import SearchableDropdown from '../components/SearchableDropdown';

export class DropdownContainer extends React.Component {

  updateDropdown = (valueObject) => {
    this.props.updateDropdown(this.props.action, this.props.name, valueObject.value);
  }

  render() {
    return <SearchableDropdown
      label={this.props.label}
      name={this.props.name}
      options={this.props.options}
      onChange={this.updateDropdown}
      value={this.props[this.props.name] || this.props.defaultValue || null}
      searchable={true}
    />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    [ownProps.name]: getStateProperty(state, 'docket_dropdown_action', ownProps.name)
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateDropdown: (actionName, prop, value) => {
    let action = Actions[actionName];

    dispatch(action(prop, value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownContainer);

DropdownContainer.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array,
  tabIndex: PropTypes.string
};
