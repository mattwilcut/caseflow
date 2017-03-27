import React from 'react';

// components
import Button from '../../components/Button';
import StyleGuideComponentTitle from '../../components/StyleGuideComponentTitle';

export default class StyleGuideLoadingButton extends React.Component {

  startLoading = () => {
    this.setState({
      loading: true
    });
  }

  reset = () => {
    this.setState({
      loading: false
    });
  }

  render() {
    return <div>
      <StyleGuideComponentTitle
        title="Loading Button"
        id="loading_button"
        link="StyleGuideLoadingButton.jsx"
      />
      <p>
        Our button components are able to react to a <em>loading</em> property which,
        when <em>true</em>, causes the button to show <strong>Loading... </strong>
        beside a spinning icon.
      </p>
      <p>
        <Button
          name={"See It In Action"}
          onClick={this.startLoading}
          loading={this.state && this.state.loading}
        />
        <Button
          name={"Reset"}
          onClick={this.reset}
          classNames={["cf-btn-link"]}
        />
      </p>
    </div>;
  }
}