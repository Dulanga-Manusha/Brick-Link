// src/components/withSidebar/withSidebar.jsx
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const withSidebar = (Component, pageType) => {
  return (props) => (
    <div className="with-sidebar">
      <Sidebar pageType={pageType} />
      <div className="page-content">
        <Component {...props} />
      </div>
    </div>
  );
};

export default withSidebar;
