import React from "react";
import FooterSocial from "./FooterSocial";
import FooterLink from "./FooterLink";
import Obfuscate from "react-obfuscate";

const year = new Date().getFullYear();

const nuLinks = [
  {
    url: "http://www.northwestern.edu/contact.html",
    label: "Contact Northwestern University",
  },
  {
    url: "http://www.northwestern.edu/hr/careers/",
    label: "Careers",
  },
  {
    url: "http://www.northwestern.edu/disclaimer.html",
    label: "Disclaimer",
  },
  {
    url: "http://www.northwestern.edu/emergency/index.html",
    label: "Campus Emergency Information",
  },
  {
    url: "http://policies.northwestern.edu/",
    label: "University Policies",
  },
  {
    url: "https://www.northwestern.edu/privacy/index.html",
    label: "Privacy Policy",
  },
];

const socialItems = [
  {
    additionalClasses: "facebook",
    url: "https://www.facebook.com/NorthwesternLibrary",
    label: "Facebook",
  },
  {
    additionalClasses: "twitter",
    url: "https://twitter.com/nu_library",
    label: "Twitter",
  },
  {
    additionalClasses: "instagram",
    url: "https://www.instagram.com/nu_library/",
    label: "Instagram",
  },
  {
    additionalClasses: "youtube",
    url: "https://www.youtube.com/user/NorthwesternLib",
    label: "YouTube",
  },
];

const libraryLinks = [
  {
    url: "http://northwestern.libanswers.com/",
    label: "FAQs",
  },
  {
    url: "http://www.library.northwestern.edu/about/support/index.html",
    label: "Support Us",
  },
  {
    url: "http://www.library.northwestern.edu/about/library-jobs/index.html",
    label: "Library Jobs",
  },
  {
    url: "http://www.library.northwestern.edu/about/administration/policies/index.html",
    label: "Library Policies",
  },
  {
    url: "http://www.library.northwestern.edu/about/contact/general-feedback.html",
    label: "Provide Feedback",
  },
];

const styles = {
  disclaimer: {
    color: "#b6acd1", // NU Purple 30
  },
};

const Footer = (props) => {
  return (
    <footer>
      <div className="contain-970">
        <div className="footer-content">
          <a href="http://www.northwestern.edu">
            <img
              src="https://common.northwestern.edu/v8/css/images/northwestern-university.svg"
              alt="Northwestern University"
            />
          </a>
          <ul>
            <li>&copy; {year} Northwestern University</li>
            {nuLinks.map((link) => (
              <li key={link.url}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-content contact">
          <ul>
            <li className="footer-pin-icon">
              <span className="hide-label">Address</span>
            </li>
            <li>1970 Campus Drive</li>
            <li>Evanston, IL 60208</li>
          </ul>
          <ul>
            <li className="footer-phone-icon">
              <span className="hide-label">Phone number</span>
            </li>
            <li>(847) 491-7658</li>
          </ul>
          <ul>
            <li className="footer-email-icon">
              <span className="hide-label">Email address</span>
            </li>
            <li>
              <Obfuscate
                email="library@northwestern.edu"
                headers={{
                  subject: "Contact from Digital Collections",
                }}
              />
            </li>
          </ul>
        </div>
        <div className="footer-content">
          <p>
            <strong>Libraries Social Media</strong>
          </p>

          {socialItems.map((item) => (
            <FooterSocial
              key={item.url}
              additionalClasses={item.additionalClasses}
              url={item.url}
              label={item.label}
            />
          ))}
        </div>
        <div className="footer-content">
          <ul>
            {libraryLinks.map((item, index) => (
              <FooterLink url={item.url} label={item.label} key={index} />
            ))}
          </ul>
        </div>
      </div>

      <div className="contain-970" style={styles.disclaimer}>
        <p>
          Northwestern University Libraries is dedicated to the fair and ethical
          preservation, digitization, curation, and use of its collections. The
          works on this Web site are made available to the public under Fair Use
          (Section 107 of the Copyright Act) for learning and teaching purposes,
          as well as to promote the mission and activities of Northwestern
          University Libraries. Northwestern University Libraries does not claim
          the copyright of any materials on this site. If you are the copyright
          holder of any item(s) in this collection or have questions, comments
          or concerns about this exhibit, please contact us via email at{" "}
          <Obfuscate email="library@northwestern.edu" />.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
