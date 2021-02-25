import React from "react";
import PropTypes from "prop-types";
import { getCollection } from "api/elasticsearch-api";
import Obfuscate from "react-obfuscate";

function WorkTabsMoreInformation({ collection = {} }) {
  if (Object.keys(collection).length === 0) return null;
  const [adminEmail, setAdminEmail] = React.useState();

  React.useEffect(() => {
    async function fn() {
      let collectionResponse = await getCollection(collection.id);
      setAdminEmail(collectionResponse._source.adminEmail || "");
    }
    fn();
  }, []);

  return adminEmail ? (
    <>
      <h4>More Information</h4>
      <p>
        For more information on this item or collection, please contact{" "}
        <Obfuscate
          email={adminEmail}
          headers={{
            subject: "Contact from Digital Collections More Information",
          }}
        />
      </p>
    </>
  ) : null;
}

WorkTabsMoreInformation.propTypes = {
  collection: PropTypes.object,
};

export default WorkTabsMoreInformation;
