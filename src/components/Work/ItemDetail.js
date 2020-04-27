import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PropTypes from "prop-types";
import TabsCite from "./Tabs/Cite";
import TabsMetadata from "./Tabs/Metadata";
import TabsFind from "./Tabs/Find";

const WorkItemDetail = ({ item }) => {
  if (!item) {
    return [];
  }

  return (
    <section
      data-testid="section-tabs-metadata"
      className="item-section contain-970 item-categories-wrapper"
    >
      <Tabs selectedTabClassName="active" id="tab-container">
        <TabList id="tabs" role="tablist">
          <Tab role="tab" data-tab-id="about">
            About this Item
          </Tab>
          <Tab role="tab" data-tab-id="find">
            Find this Item
          </Tab>
          <Tab role="tab" data-tab-id="cite">
            Cite this Item
          </Tab>
        </TabList>

        <div id="tab-content">
          <TabPanel>
            {/* TODO: Fix all the metadata currently supported */}
            {/* <TabsMetadata item={item} /> */}
          </TabPanel>
          <TabPanel>
            <TabsFind item={item} />
          </TabPanel>
          <TabPanel>
            <TabsCite item={item} />
          </TabPanel>
        </div>
      </Tabs>
    </section>
  );
};

WorkItemDetail.propTypes = {
  item: PropTypes.object
};

export default WorkItemDetail;
