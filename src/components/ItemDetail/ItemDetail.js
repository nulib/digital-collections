import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TabContent from './TabContent';
import PropTypes from 'prop-types';

const ItemDetail = props => {
  if (!props.item) {
    return [];
  }

  const {
    accessionNumber = '',
    admin_set: { title: [admin_set] } = '', // division,
    based_near = null,
    bibliographicCitation = '',
    box: { name: boxName } = null,
    box: { number: boxNumber } = null,
    abstract: [abstract] = '',
    callNumber = '',
    caption: [caption] = '',
    catalogKey = '',
    collection = null,
    contributor = null,
    creator = null,
    date: [date] = '',
    description: [description] = '',
    folder: { name: folderName } = null,
    folder: { number: folderNumber } = null,
    genre = null,
    id = '',
    identifier = null,
    keyword = '',
    language = null,
    license = null,
    notes = null,
    nulUseStatement = '',
    physical_description: { material } = null,
    physical_description: { size } = null,
    provenance: [provenance] = '',
    publisher = '',
    related_material: relatedMaterial = null,
    related_url: relatedUrl = null,
    rightsHolder = '',
    rights_statement: { label: rightsStatementText } = null,
    scope_and_contents: scopeAndContents = null,
    series = null,
    source = '',
    stylePeriod = null,
    subject = '',
    table_of_contents: tableOfConents = null,
    technique = null,
    title: { primary: title } = '',
    title: { alternate: alternateTitle } = ''
  } = props.item;

  const subjectTemporal =
    subject &&
    subject.filter(entry => entry.role === 'subject_temporal').length > 0
      ? subject.filter(entry => entry.role === 'subject_temporal')
      : null;

  const metadataPanel = [
    { label: 'Alternate Title', value: alternateTitle },
    { label: 'Abstract', value: abstract },
    { label: 'Caption', value: caption },
    { label: 'Creator', value: creator, facet_value: 'Creator' },
    { label: 'Contributor', value: contributor, facet_value: 'Contributor' },
    { label: 'Date', value: date },
    { label: 'Description', value: description },
    { label: 'Division', value: admin_set, facet_value: 'Library Unit' },
    { label: 'Genre', value: genre, facet_value: 'Genre' },
    { label: 'Keyword', value: keyword },
    { label: 'Language', value: language, facet_value: 'Language' },
    { label: 'Location', value: based_near, facet_value: 'Location' },
    { label: 'Notes', value: notes },
    { label: 'Physical Description material', value: material },
    { label: 'Physical Description size', value: size },
    { label: 'Provenance', value: provenance },
    { label: 'Publisher', value: publisher, facet_value: 'Publisher' },
    { label: 'Related Material', value: relatedMaterial },
    { label: 'Related Url', value: relatedUrl },
    { label: 'Rights Holder', value: rightsHolder },
    {
      label: 'Rights Statement',
      value: rightsStatementText,
      facet_value: 'Rights Statement'
    },
    { label: 'Scope and Contents', value: scopeAndContents },
    { label: 'Series', value: series },
    { label: 'Source', value: source },
    { label: 'Style Period', value: stylePeriod, facet_value: 'Style Period' },
    { label: 'Subject', value: subject, facet_value: 'Subject' },
    { label: 'Subject Temporal', value: subjectTemporal },
    { label: 'Table of Contents', value: tableOfConents },
    { label: 'Technique', value: technique, facet_value: 'Technique' },
    { label: 'Title', value: title }
  ];

  const findThisItemPanel = [
    { label: 'Accession', value: accessionNumber },
    { label: 'Box Name', value: boxName },
    { label: 'Box Number', value: boxNumber },
    { label: 'Call Number', value: callNumber },
    { label: 'Catalog Key', value: catalogKey },
    { label: 'Citation', value: bibliographicCitation },
    { label: 'Folder Name', value: folderName },
    {
      label: 'Folder Number',
      value: folderNumber
    }
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
    { label: 'Identifier', value: identifier },
    { label: 'Licenses', value: license },
    { label: 'Title', value: title },
    { label: 'Use Statement', value: nulUseStatement }
  ];

  const citationFormats = [
    { label: 'APA Format', value: formatAPA },
    { label: 'Chicago/Turabian Format', value: formatChicago },
    { label: 'MLA Format', value: formatMLA },
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

ItemDetail.propTypes = {
  item: PropTypes.object
};

export default ItemDetail;
