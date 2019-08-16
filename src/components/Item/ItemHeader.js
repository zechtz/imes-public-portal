import React from 'react';
export const HEADER_HEIGHT = 45;

const style = {
  fontSize: '14px'
}

const ItemHeader = props => {
  const { title } = props;
  return (
    <div className="dashboard-item-header">
      <div
        className="dashboard-item-header-title"
        style={style}>
        {title}
      </div>
    </div>
  );
};

export default ItemHeader;
