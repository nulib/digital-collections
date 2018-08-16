import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TabContent from './TabContent';

const ItemDetail = props => {
  if (!props.item) {
    return [];
  }

  const {
    title: { primary: [title] } = '',
    title: { alternate: [alternate] } = '',
    abstract: [abstract] = '',
    caption: [caption] = '',
    contributor = null,
    date: [date] = '',
    description: [description] = '',
    admin_set: { title: [admin_set] } = '', // division
    identifier = null,
    license = null,
    use_statement = '',
    keyword = '',
    language = null,
    location = null,
    permalink = '',
    provenance: [provenance] = '',
    publisher = '',
    related_url = null,
    rights_holder = '',
    source = '',
    subject = '',
    rights_statement = '',
    extra_fields: { genre } = null,
    extra_fields: { physical_description: { material } } = null,
    extra_fields: { physical_description: { size } } = null,
    extra_fields: { style_period } = null,
    extra_fields: { technique } = null,
    accession = '',
    box_name = null,
    box_number = null,
    folder_name = null,
    folder_number = null,
    call_number = '',
    catalog_key = '',
    citation = ''
  } = props.item;

  const metadataPanel = [
    { label: 'Title', value: title },
    { label: 'Alternate Title', value: alternate },
    { label: 'Abstract', value: abstract },
    { label: 'Caption', value: caption },
    { label: 'Contributor', value: contributor },
    { label: 'Date', value: date },
    { label: 'Description', value: description },
    { label: 'Division', value: admin_set },
    { label: 'Keyword', value: keyword },
    { label: 'Language', value: language },
    { label: 'Location', value: location },
    { label: 'Provenance', value: provenance },
    { label: 'Publisher', value: publisher },
    { label: 'Related Url', value: related_url },
    { label: 'Rights Holder', value: rights_holder },
    { label: 'Source', value: source },
    { label: 'Subject', value: subject },
    { label: 'Rights Statement', value: rights_statement },
    { label: 'Genre', value: genre },
    { label: 'Physical Description material', value: material },
    { label: 'Physical Description size', value: size },
    { label: 'Style Period', value: style_period },
    { label: 'Technique', value: technique }
  ];

  const findThisItemPanel = [
    { label: 'Accession', value: accession },
    { label: 'Box Name', value: box_name },
    { label: 'Box Number', value: box_number },
    { label: 'Folder Name', value: folder_name },
    { label: 'Folder Number', value: folder_number },
    { label: 'Call Number', value: call_number },
    { label: 'Catalog Key', value: catalog_key },
    { label: 'Citation', value: citation }
  ];

  let formatMLA = `${title} here's the rest MLA`;
  let formatChicago = `${title} chicago format`;
  let formatAPA = `${title} apa format`;
  let formatWikipedia = `${title} wikipedia format`;

  const citePanel = [
    { label: 'Title', value: title },
    { label: 'Permalink', value: permalink },
    { label: 'Identifier', value: identifier },
    { label: 'License', value: license },
    { label: 'Use Statement', value: use_statement }
  ];

  const citationFormats = [
    { label: 'MLA Format', value: formatMLA },
    { label: 'Chicago/Turabian Format', value: formatChicago },
    { label: 'APA Format', value: formatAPA },
    { label: 'Wikipedia Citation', value: formatWikipedia }
  ];

  return (
    <section className="item-section contain-970 item-categories-wrapper">
      <Tabs selectedTabClassName="active" id="tab-container">
        <TabList id="tabs" role="tablist">
          <Tab role="tab">About this Item</Tab>
          <Tab role="tab">Find this Item</Tab>
          <Tab role="tab">Cite this Item</Tab>
        </TabList>

        <div id="tab-content">
          <TabPanel>
            <TabContent items={metadataPanel} />
          </TabPanel>
          <TabPanel>
            <TabContent items={findThisItemPanel} />
          </TabPanel>
          <TabPanel>
            <div className="cite-group-col">
              <div className="cite-group">
                <TabContent items={citePanel} />
              </div>
            </div>
            <div className="cite-group-col">
              <div className="cite-group">
                <TabContent items={citationFormats} />
              </div>
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </section>
  );
};

export default ItemDetail;
