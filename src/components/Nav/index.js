import React, {Component} from 'react';
import NavItem from './NavItem';
import CollectionsApi from '../../api/collections-api';
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionsSubNav: {
        navIntro: {
          headline: 'Explore Our Institutional Collections',
          routePath: '/collections',
          buttonLabel: 'View All'
        },
        navLinks: []
      },
      workTypesSubNav: {
        navIntro: {
          headline: 'Explore Work Types',
          routePath: '/sets/workTypes',
          buttonLabel: 'View All'
        },
        navLinks: []
      }
    };

    this.collectionsApi = new CollectionsApi();
  }

  componentDidMount() {
    // Grab collections subnavigation
    // TODO: Wire this up
    this.collectionsApi.getAllCollections().then(data => {

    });

    this.setState(prevState => ({
      collectionsSubNav: {
        ...prevState.collectionsSubNav,
        navLinks: [{
          label: 'This links to a collection',
          url: 'collections'
        }, {
          label: 'This links to another collection',
          url: 'collections'
        }, {
          label: 'Link 3',
          url: 'And yet another collection'
        }]
      },
      workTypesSubNav: {
        ...prevState.workTypesSubNav,
        navLinks: [{
          label: 'Work type 1',
          url: '/sets/workTypes'
        }, {
          label: 'Awesome work type',
          url: '/sets/workTypes'
        }]
      }
    }));
  }

  render() {

    return (
      <nav id="top-nav" aria-label="main navigation menu">
        <div className="contain-1120">
            <ul>
              <NavItem label="Collections" setType="collections" subNav={this.state.collectionsSubNav} />
              <NavItem label="Work Types" setType="workTypes" subNav={this.state.workTypesSubNav} />
              {/*<NavItem label="Subjects" setType="subjects" />
              <NavItem label="Creators" setType="creators" />
              <NavItem label="Work Types" setType="workTypes" />*/}
            </ul>
        </div>
    </nav>
    );
  }
}

export default Nav;
