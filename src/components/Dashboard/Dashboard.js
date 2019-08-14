import React, { Component } from 'react';
import { connect } from 'react-redux';

import { tSelectDashboard } from '../../actions/dashboards';
import { sDashboardsIsFetching } from '../../reducers/dashboards';
import { EDIT, NEW } from './dashboardModes';
import ViewDashboard from './ViewDashboard';

class Dashboard extends Component {
  setDashboard = () => {
    if (this.props.dashboardsLoaded) {
      const id = this.props.match.params.dashboardId || null;

      this.props.selectDashboard(id);

      this.scrollToTop();
    }
  };

  scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  componentDidMount() {
    this.setDashboard();
  }

  componentDidUpdate() {
    this.setDashboard();
  }

  render() {
    switch (this.props.mode) {
      case EDIT:
        return <ViewDashboard />;
      case NEW:
        return <ViewDashboard />;
      default:
        return <ViewDashboard />;
    }
  }
}

const mapStateToProps = state => {
  return { dashboardsLoaded: !sDashboardsIsFetching(state) };
};

export default connect(
  mapStateToProps,
  {
    selectDashboard: tSelectDashboard,
  }
)(Dashboard);
