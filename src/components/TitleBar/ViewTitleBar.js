import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';

import { orObject } from '../../modules/util';
import { tStarDashboard } from '../../actions/dashboards';
import { acSetSelectedShowDescription } from '../../actions/selected';
import FilterSelector from '../ItemFilter/FilterSelector';
import Info from './Info';
import {
  sGetSelectedId,
  sGetSelectedShowDescription,
} from '../../reducers/selected';
import {
  sGetDashboardById,
  sGetDashboardItems,
} from '../../reducers/dashboards';
import { colors } from '../../modules/colors';

const NO_DESCRIPTION = i18n.t('No description');

const styles = {
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  },
  starIcon: {
    fill: colors.muiDefaultGrey,
  },
  textButton: {
    minWidth: '30px',
    top: '1px',
  },
  editLink: {
    display: 'inline-block',
    verticalAlign: 'top',
    textDecoration: 'none',
    marginRight: '4px',
  },
  titleBar: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  titleBarIcon: {
    marginLeft: 5,
    position: 'relative',
    top: 1,
    cursor: 'pointer',
  },
};

class ViewTitleBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sharingDialogIsOpen: false,
    };
  }

  toggleSharingDialog = () =>
    this.setState({ sharingDialogIsOpen: !this.state.sharingDialogIsOpen });

  render() {
    const {
      id,
      name,
      description,
      access,
      style,
      showDescription,
      onInfoClick,
      classes,
    } = this.props;

    const titleStyle = Object.assign({}, style.title, {
      cursor: 'default',
      userSelect: 'text',
      top: '7px',
    });

    return (
      <Fragment>
      <div className={classes.titleBar}>
      <span style={titleStyle}>{name}</span>
      <div className={classes.actions}>
      <div className={classes.titleBarIcon}>
      <Info onClick={onInfoClick} />
      </div>
      <div style={{ marginLeft: '10px' }}>
      {access.manage ? (
        <span style={{ marginRight: '4px' }}>
        </span>
      ) : null}
      <span style={{ marginRight: '4px' }}>
      <FilterSelector />
      </span>
      </div>
      </div>
      </div>
      {showDescription ? (
        <div
        className="dashboard-description"
        style={Object.assign(
          { paddingTop: '5px', paddingBottom: '5px' },
          style.description,
          !description ? { color: '#888' } : {}
        )}
        >
        {description || NO_DESCRIPTION}
        </div>
      ) : null}
      {id ? (
        <SharingDialog
        d2={this.context.d2}
        id={id}
        type="dashboard"
        open={this.state.sharingDialogIsOpen}
        onRequestClose={this.toggleSharingDialog}
        />
      ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const id = sGetSelectedId(state);
  const dashboard = orObject(sGetDashboardById(state, id));

  return {
    id,
    name: dashboard.displayName,
    description: dashboard.displayDescription,
    dashboardItems: sGetDashboardItems(state),
    showDescription: sGetSelectedShowDescription(state),
    starred: dashboard.starred,
    access: orObject(dashboard.access),
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { id, starred, showDescription } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    ...ownProps,
    onStarClick: () => dispatch(tStarDashboard(id, !starred)),
    onInfoClick: () =>
    dispatch(acSetSelectedShowDescription(!showDescription)),
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(withStyles(styles)(ViewTitleBar));

ViewTitleBar.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  starred: PropTypes.bool,
  showDescription: PropTypes.bool,
  onInfoClick: PropTypes.func,
};

ViewTitleBar.defaultProps = {
  name: '',
  description: '',
  starred: false,
  showDescription: false,
  onInfoClick: null,
};

ViewTitleBar.contextTypes = {
  d2: PropTypes.object,
};
