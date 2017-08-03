import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStateProperty } from './utils';
import * as Actions from './actions/Dockets';
import Checkbox from '../components/Checkbox';

export class CheckboxContainer extends React.Component {

  updateCheckbox = (value) => {
    this.props.updateCheckbox(this.props.action, this.props.id, value);
  }

  render() {
    return <Checkbox
      label={this.props.label}
      name={this.props.id}
      onChange={this.updateCheckbox}
      value={this.props[this.props.id] || this.props.defaultValue || false}
    ></Checkbox>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    [ownProps.id]: getStateProperty(state, 'docket_transcript_required', ownProps.id)
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateCheckbox: (actionName, prop, value) => {
    let action = Actions[actionName];

    dispatch(action(prop, value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxContainer);

CheckboxContainer.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
