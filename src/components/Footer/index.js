import React, {Component} from 'react';
import FooterSocial from './FooterSocial';
import FooterLink from './FooterLink';
import './Footer.css';

class Footer extends Component {
  render() {
    const socialItems = [{
      additionalClasses: "facebook",
      url: "https://www.facebook.com/NorthwesternLibrary",
      label: "Facebook"
    }, {
      additionalClasses: "twitter",
      url: "https://twitter.com/nu_library",
      label: "Twitter"
    }, {
      additionalClasses: "instagram",
      url: "https://www.instagram.com/nu_library/",
      label: "Instagram"
    }, {
      additionalClasses: "youtube",
      url: "https://www.youtube.com/user/NorthwesternLib",
      label: "YouTube"
    }];

    const libraryLinks = [{
      url: 'http://northwestern.libanswers.com/',
      label: 'FAQs',
    }, {
      url: 'http://www.library.northwestern.edu/about/support/index.html',
      label: 'Support Us',
    }, {
      url: 'http://www.library.northwestern.edu/about/library-jobs/index.html',
      label: 'Library Jobs',
    }, {
      url: 'http://www.library.northwestern.edu/about/administration/policies/index.html',
      label: 'Library Policies',
    }, {
      url: 'http://www.library.northwestern.edu/about/contact/general-feedback.html',
      label: 'Provide Feedback',
    }];

    return (
      <footer>
        <div className="contain-970">
            <div className="footer-content">
                <a href="http://www.northwestern.edu"><img src="https://common.northwestern.edu/v8/css/images/northwestern-university.svg" alt="Northwestern University" /></a>
                <ul>
                    <li>&copy; <script type="text/javascript">document.write(new Date().getFullYear())</script> Northwestern University</li>
                    <li><a href="http://www.northwestern.edu/contact.html">Contact Northwestern University</a></li>
                    <li><a href="http://www.northwestern.edu/hr/careers/">Careers</a></li>
                    <li><a href="http://www.northwestern.edu/disclaimer.html">Disclaimer</a></li>
                    <li><a href="http://www.northwestern.edu/emergency/index.html">Campus Emergency Information</a></li>
                    <li><a href="http://policies.northwestern.edu/">University Policies</a></li>
                </ul>
            </div>
            <div className="footer-content contact">
                <ul>
                    <li className="footer-pin-icon"><span className="hide-label">Address</span></li>
                    <li>1970 Campus Drive</li>
                    <li>Evanston, IL 60208</li>
                </ul>
                <ul>
                    <li className="footer-phone-icon"><span className="hide-label">Phone number</span></li>
                    <li>(847) 491-7658</li>
                </ul>
                <ul>
                    <li className="footer-email-icon"><span className="hide-label">Email address</span></li>
                    <li><a href="mailto:library@northwestern.edu">library@northwestern.edu</a></li>
                </ul>
            </div>
            <div className="footer-content">
                <p><strong>Libraries Social Media</strong></p>

                {socialItems.map((item, index) => <FooterSocial key={index}  additionalClasses={item.additionalClasses} url={item.url} label={item.label} />
                )}
            </div>
            <div className="footer-content">
              <ul>
                {libraryLinks.map((item, index) => <FooterLink url={item.url} label={item.label} key={index} />)}
              </ul>
            </div>
        </div>
    </footer>
    );
  }
}

export default Footer;
