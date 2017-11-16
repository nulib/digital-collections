import React, {Component} from 'react';
import HeroSection from '../../components/HeroSection';
import LandingPageSection from './LandingPageSection';
import './LandingPage.css';

class LandingPage extends Component {

  componentDidMount() {
    document.body.className="landing-page";
  }

  render() {
    const sections = {
      collection: {
        name: 'collection',
        label: 'Institutional Collections',
        description: `Northwestern's Institutional Collections are a wide-ranging collection spanning cultures from .... more text goes here?`
      },
      creator: {
        name: 'creator',
        label: 'Creators',
        description: `Explore the various creators of these fabulous collection pieces.  Get to know them.  Love them.`
      },
      subject: {
        name: 'subject',
        label: 'Subjects',
        description: `Subjects are important in identifying this and that, and maybe some other stuff.`
      },
      workType: {
        name: 'workType',
        label: 'Work Type',
        description: `Is it really necessary to display these descriptions, and if so where will they live where users/curators can update their text and the application can access the data?`
      }
    }

    return (
      <div>
        <HeroSection />
        <div id="page">
          <main id="main-content" className="content" tabIndex="0">
            <LandingPageSection sectionType={sections.collection} />
            <LandingPageSection sectionType={sections.creator} />
            <LandingPageSection sectionType={sections.subject} />
            <LandingPageSection sectionType={sections.workType} />
          </main>
        </div>
      </div>
    );
  }
}

export default LandingPage;
