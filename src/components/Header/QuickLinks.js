import React from 'react';
import QuickLinksItems from './QuickLinksItems';

const QuickLinks = props => {
  return (
    <div id="quick-links" aria-label="quick links navigation">
      <ul>
        <QuickLinksItems {...props} />
      </ul>
    </div>
  );
};

export default QuickLinks;
