import React, {Component} from 'react';
import LeftNav from './LeftNav';
import Breadcrumbs from './Breadcrumbs';
import Sidebar from './Sidebar';

class BoilerPlatePage extends Component {
  render() {
    return (
      <div id="page">
        <LeftNav />
        <main id="main-content" className="content" tabIndex="0">
            <Breadcrumbs />
            <Sidebar />

            <h2>Boilerplate</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at faucibus dolor. Fusce vel vulputate nulla. In consectetur elit interdum justo imperdiet hendrerit. Vestibulum in bibendum mauris. Vestibulum <a href="#">dignissim mauris</a> nec dolor semper commodo. Sed nibh sapien, mollis eget congue non, congue accumsan diam. Maecenas blandit neque nisl, id egestas velit. Aliquam convallis dictum enim, gravida scelerisque odio sollicitudin at.</p>

            <h3>[LISTS]</h3>
            <p>Duis fringilla luctus mi, ultrices facilisis ipsum ultricies sit amet. <em><a href="#">Morbi non massa tellus.</a></em> Nam eu quam tincidunt sapien eleifend sodales. Nulla viverra placerat turpis eget euismod. Nullam erat ipsum, consectetur eget congue vel, congue ac enim. <a href="#"><em>Morbi non massa tellus.</em></a></p>
            <ul>
                <li>Unordered List Item 1</li>
                <li>Unordered List Item 2</li>
                <li>Unordered List Item 3
                    <ul>
                        <li>Unordered Sub Item 1</li>
                        <li>Unordered Sub Item 2</li>
                        <li>Unordered Sub Item 3</li>
                    </ul>
                </li>
                <li>List Item 4</li>
            </ul>

        </main>
    </div>
    );
  }
}

export default BoilerPlatePage;
