import React, {Component} from 'react';

class SetsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.className="standard-page";
  }

  render() {
    const setType = this.props.match.params.name;
    console.log('setType', setType);

    return (
      <div>
        <div id="page">
          <main id="main-content" className="content-full" tabIndex="0">
            <div className="contain-1120">
              <h2>Headline here</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
              <form className="web-form">
                <div className="field">
                    <input id="search-text" name="search-text" required="required" type="text" placeholder="Search Collections"/>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default SetsPage;
