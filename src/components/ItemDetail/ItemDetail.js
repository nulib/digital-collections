import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TabContent from './TabContent';

const ItemDetail = props => {
  if (!props.item) {
    return [];
  }

  const {
    title: { primary: title } = '',
    title: { alternate: alternateTitle } = '',
    abstract: [abstract] = '',
    caption: [caption] = '',
    collection = null,
    contributor = null,
    creator = null,
    date: [date] = '',
    description: [description] = '',
    admin_set: { title: [admin_set] } = '', // division
    id = '',
    identifier = null,
    license = null,
    nul_use_statement = '',
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
    rights_statement: { label: rights_statement_text } = null,
    genre = null,
    physical_description: { material } = null,
    physical_description: { size } = null,
    style_period = null,
    technique = null,
    accession_number = '',
    box: { name: box_name } = null,
    box: { number: box_number } = null,
    folder: { name: folder_name } = null,
    folder: { number: folder_number } = null,
    call_number = '',
    catalog_key = '',
    bibliographic_citation = ''
  } = props.item;

  const metadataPanel = [
    { label: 'Title', value: title },
    { label: 'Alternate Title', value: alternateTitle },
    { label: 'Abstract', value: abstract },
    { label: 'Caption', value: caption },
    { label: 'Creator', value: creator, facet_value: 'Creator' },
    { label: 'Contributor', value: contributor, facet_value: 'Contributor' },
    { label: 'Date', value: date },
    { label: 'Description', value: description },
    { label: 'Division', value: admin_set, facet_value: 'Library Unit' },
    { label: 'Keyword', value: keyword },
    { label: 'Language', value: language, facet_value: 'Language' },
    { label: 'Location', value: location, facet_value: 'Location' },
    { label: 'Provenance', value: provenance },
    { label: 'Publisher', value: publisher, facet_value: 'Publisher' },
    { label: 'Related Url', value: related_url },
    { label: 'Rights Holder', value: rights_holder },
    { label: 'Source', value: source },
    { label: 'Subject', value: subject, facet_value: 'Subject' },
    {
      label: 'Rights Statement',
      value: rights_statement_text,
      facet_value: 'Rights Statement'
    },
    { label: 'Genre', value: genre, facet_value: 'Genre' },
    { label: 'Physical Description material', value: material },
    { label: 'Physical Description size', value: size },
    { label: 'Style Period', value: style_period, facet_value: 'Style Period' },
    { label: 'Technique', value: technique, facet_value: 'Technique' }
  ];

  const findThisItemPanel = [
    { label: 'Accession', value: accession_number },
    { label: 'Box Name', value: box_name },
    { label: 'Box Number', value: box_number },
    { label: 'Folder Name', value: folder_name },
    {
      label: 'Folder Number',
      value: folder_number
    },
    { label: 'Call Number', value: call_number },
    { label: 'Catalog Key', value: catalog_key },
    { label: 'Citation', value: bibliographic_citation }
  ];

  const nul = 'Northwestern University Libraries';
  const item_link = `${window.location.origin}/${id}`;
  const today = new Date().toDateString();
  const collection_title =
    collection && collection.length > 0 ? `${collection[0].title}.` : '';

  const formatMLA = `${admin_set}, ${nul}. "${title}", ${collection_title} ${date}. ${
    window.location.origin
  }/${id}`;
  const formatChicago = `${admin_set}, ${nul}. "${title}", ${collection_title} Accessed ${today}. ${item_link}`;
  const formatAPA = `${admin_set}, ${nul}. (${date}). ${title}, Retrieved from ${item_link}`;
  const formatWikipedia = `<ref name=NUL>{{cite web | url=${item_link} | title= ${title} (${date}) }} |author=Digital Collections, ${nul} |accessdate=${today} |publisher=${nul}, ${admin_set}}}</ref>`;

  const citePanel = [
    { label: 'Title', value: title },
    { label: 'Permalink', value: permalink },
    { label: 'Identifier', value: identifier },
    { label: 'Licenses', value: license },
    { label: 'Use Statement', value: nul_use_statement }
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
