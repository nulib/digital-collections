import React, {Component} from 'react';

class Footer extends Component {
  render() {
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
                    <li><strong>Your Department Name</strong></li>
                    <li>633 Clark Street</li>
                    <li>Evanston, IL 60208</li>
                </ul>
                <ul>
                    <li className="footer-phone-icon"><span className="hide-label">Phone number</span></li>
                    <li>(123) 456-7890</li>
                </ul>
                <ul>
                    <li className="footer-fax-icon"><span className="hide-label">Fax number</span></li>
                    <li>(123) 456-7890</li>
                </ul>
                <ul>
                    <li className="footer-email-icon"><span className="hide-label">Email address</span></li>
                    <li><a href="mailto:info@northwestern.edu">your-department@northwestern.edu</a></li>
                </ul>
            </div>
            <div className="footer-content">
                <p><strong>(Department Name) Social Media</strong></p>
                <a className="social facebook" href="https://www.facebook.com/NorthwesternLibrary">Facebook</a>
                <a className="social twitter" href="https://twitter.com/nu_library">Twitter</a>
                <a className="social instagram" href="https://www.instagram.com/nu_library/">Instagram</a>
                <a className="social youtube" href="https://www.youtube.com/user/NorthwesternLib">YouTube</a>
            </div>
            <div className="footer-content">
              <ul>
                <li><a href="http://northwestern.libanswers.com/" target="_blank" rel="noopener noreferrer">FAQs</a></li>
                <li><a href="about/support/index.html" target="_blank" rel="noopener noreferrer">Support Us</a></li>
                <li><a href="about/library-jobs/index.html" target="_blank" rel="noopener noreferrer">Library Jobs</a></li>
                <li><a href="about/administration/policies/index.html" target="_blank" rel="noopener noreferrer">Library Policies</a></li>
                <li><a href="about/contact/general-feedback.html" target="_blank" rel="noopener noreferrer">Provide Feedback</a></li>
              </ul>
            </div>
        </div>
    </footer>
    );
  }
}

export default Footer;
