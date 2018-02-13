import React, { Component } from 'react';

class LeftNav extends Component {
  render() {
    return (
      <nav id="left-nav" aria-label="section navigation menu" tabIndex="0">
        <h2>
          <a href="#">Section Header</a>
        </h2>
        <ul>
          <li>
            <a href="../index.html" className="active">
              Active Parent
            </a>
            <ul>
              <li>
                <a href="#" className="active">
                  Active Child
                </a>
                <ul>
                  <li>
                    <a href="#">Link</a>
                  </li>
                  <li>
                    <a href="#" className="active">
                      Active Grandchild
                    </a>
                    <ul className="open">
                      <li>
                        <a href="#" className="active">
                          Active Link
                        </a>
                      </li>
                      <li>
                        <a href="#">Link</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Link</a>
          </li>
          <li>
            <a href="#">Link</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default LeftNav;
