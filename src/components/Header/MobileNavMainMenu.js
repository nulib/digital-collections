import React, {Component} from 'react';

class MobileNavMainMenu extends Component {
  render() {
    return (
      <ul aria-label="main menu">
          <li tabIndex="0"><a href="#">Collections</a><span className="arrow"><a aria-haspopup="true" href="#" role="button"><span>Expand</span> Submenu</a></span>
              <ul aria-expanded="false" aria-hidden="true">
                  <li><a href="#">Level 2, Link 1 </a><span className="arrow"><a aria-haspopup="true" href="#" role="button"><span>Expand</span>Submenu</a></span>
                      <ul aria-expanded="false" aria-hidden="true">
                          <li><a href="#">Level 3, Link 2 the quick brown fox jumped over the lazy dog</a><span className="arrow"><a aria-haspopup="true" href="#" role="button"><span>Expand</span>Submenu</a></span>
                              <ul aria-expanded="false" aria-hidden="true">
                                  <li><a href="#">Level 4, Link 1</a></li>
                                  <li><a href="#">Level 4, Link 2</a><span className="arrow"><a aria-haspopup="true" href="#" role="button"><span>Expand</span>Submenu</a></span>
                                      <ul aria-expanded="false" aria-hidden="true">
                                          <li><a href="#">Level 5, Link 1</a><span className="arrow"><a aria-haspopup="true" href="#" role="button"><span>Expand</span>Submenu</a></span>
                                              <ul aria-expanded="false" aria-hidden="true">
                                                  <li><a href="#">Level 6, Link 1</a></li>
                                              </ul>
                                          </li>
                                          <li><a href="#">Level 5, Link 2</a></li>
                                          <li><a href="#" className="active">Level 5, Link 3</a></li>
                                          <li><a href="#">Level 5, Link 4</a></li>
                                          <li><a href="#">Level 5, Link 5</a></li>
                                      </ul>
                                  </li>
                                  <li><a href="#">Level 4, Link 3</a></li>
                              </ul>
                          </li>
                          <li><a href="#">Level 3, Link 2</a></li>
                          <li><a href="#">Level 3, Link 3</a></li>
                          <li><a href="#">Level 3, Link 4</a></li>
                          <li><a href="#">Level 3, Link 5</a></li>
                      </ul>
                  </li>
              </ul>
          </li>
          <li><a href="#">Subjects</a><span className="arrow"><a aria-haspopup="true" href="#" role="button"><span>Expand</span> Submenu</a></span>
              <ul aria-expanded="false" aria-hidden="true">
                  <li><a href="#">Level 2, Link 1</a></li>
              </ul>
          </li>
          <li><a href="#">Creators</a><span className="arrow"><a aria-haspopup="true" href="#" role="button"><span>Expand</span> Submenu</a></span>
              <ul aria-expanded="false" aria-hidden="true">
                  <li><a href="#">Level 2, Link 1</a></li>
              </ul>
          </li>
          <li><a href="#">Work Types</a><span className="arrow"><a aria-haspopup="true" href="#" role="button"><span>Expand</span> Submenu</a></span>
              <ul aria-expanded="false" aria-hidden="true">
                  <li><a href="#">Level 2, Link 1</a></li>
              </ul>
          </li>
      </ul>
    );
  }
}

export default MobileNavMainMenu;
