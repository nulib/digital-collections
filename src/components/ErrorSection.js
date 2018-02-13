import React from 'react';
import './ErrorSection.css';

function ErrorSection(props) {
  return (
    <div className="ErrorSection">
      <section>
        <div className="section-top contain-970">
          Error: {props.error.message}
        </div>
      </section>
    </div>
  );
}

export default ErrorSection;
