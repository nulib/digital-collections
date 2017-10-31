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
                <a href="#" className="social facebook">Facebook</a>
                <a href="#" className="social twitter">Twitter</a>
                <a href="#" className="social social instagram">Instagram</a>
                <a href="#" className="social rss">RSS</a>
                <a href="#" className="social youtube">YouTube</a>
                <a href="#" className="social tumblr">Tumblr</a>
                <a href="#" className="social wordpress">WordPress</a>
                <a href="#" className="social futurity">Futurity</a>
                <a href="#" className="social vimeo">Vimeo</a>
                <a href="#" className="social linkedin">Linkedin</a>
                <a href="#" className="social google-plus">Google Plus</a>
                <a href="#" className="social google-groups">Google Groups</a>
                <a href="#" className="social blog">Blog</a>
                <a href="#" className="social github">Github</a>
                <a href="#" className="social flickr">Flickr</a>
                <a href="#" className="social storify">Storify</a>
                <a href="#" className="social pinterest">Pinterest</a>
                <a href="#" className="social we-will">We Will</a>
            </div>
            <div className="footer-content">
                <ul>
                    <li><a href="#">Link 1</a></li>
                    <li><a href="#">Link 2</a></li>
                    <li><a href="#">Link 3</a></li>
                    <li><a href="#">Link 4</a></li>
                    <li><a href="#">Link 5</a></li>
                    <li><a href="#">Link 6</a></li>
                </ul>
            </div>
        </div>
    </footer>
    );
  }
}

export default Footer;
