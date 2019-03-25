import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TabContent from './TabContent';
import PropTypes from 'prop-types';
import CiteTabContent from './CiteTabContent';
import { ADMIN_SET_CONTACTS } from '../../services/global-vars';

const ItemDetail = props => {
  if (!props.item) {
    return [];
  }

  const {
    accession_number: accessionNumber = '',
    admin_set: { title: [admin_set] } = '', // division,
    based_near = null,
    bibliographic_citation: bibliographicCitation = '',
    box: { name: boxName } = null,
    box: { number: boxNumber } = null,
    abstract: [abstract] = '',
    call_number: callNumber = '',
    caption: [caption] = '',
    catalog_key: catalogKey = '',
    contributor = null,
    creator = null,
    date: [date] = '',
    description: [description] = '',
    folder: { name: folderName } = null,
    folder: { number: folderNumber } = null,
    genre = null,
    keyword = '',
    language = null,
    notes = null,
    nul_use_statement: nulUseStatement = null,
    physical_description: { material } = null,
    physical_description: { size } = null,
    provenance: [provenance] = '',
    publisher = '',
    related_material: relatedMaterial = null,
    related_url: relatedUrl = null,
    rights_holder: rightsHolder = '',
    rights_statement: { label: rightsStatementText } = null,
    scope_and_contents: scopeAndContents = null,
    series = null,
    source = '',
    style_period: stylePeriod = null,
    subject = '',
    table_of_contents: tableOfConents = null,
    technique = null,
    title: { primary: title } = '',
    title: { alternate: alternateTitle } = ''
  } = props.item;

  const getAdminSetEmail = () => {
    let email = '';
    try {
      let results = ADMIN_SET_CONTACTS.filter(
        obj => obj.id === props.item.admin_set.id
      );
      email = results[0].email;
    } catch (e) {}

    if (!email) {
      return;
    }

    return {
      label: 'More Information',
      value: `For more information on this item or collection, please contact ${email}`
    };
  };

  const subjectTemporal =
    subject &&
    subject.filter(entry => entry.role === 'subject_temporal').length > 0
      ? subject.filter(entry => entry.role === 'subject_temporal')
      : null;

  const primoLink = `https://search.library.northwestern.edu/primo-explore/search?field=any&query=any,contains,${catalogKey}&query=&institution=01NWU&vid=NULVNEW&search_scope=NWU`;

  const metadataPanel = [
    { label: 'Alternate Title', value: alternateTitle },
    { label: 'Abstract', value: abstract },
    { label: 'Caption', value: caption },
    { label: 'Creator', value: creator, facet_value: 'Creator' },
    { label: 'Contributor', value: contributor, facet_value: 'Contributor' },
    { label: 'Date', value: date },
    { label: 'Description', value: description },
    {
      label: 'Department',
      value: admin_set,
      facet_value: 'Library Department'
    },
    { label: 'Genre', value: genre, facet_value: 'Genre' },
    { label: 'Keyword', value: keyword },
    { label: 'Language', value: language, facet_value: 'Language' },
    { label: 'Location', value: based_near, facet_value: 'Location' },
    { label: 'Notes', value: notes },
    { label: 'NUL Use Statement', value: nulUseStatement },
    { label: 'Physical Description material', value: material },
    { label: 'Physical Description size', value: size },
    { label: 'Provenance', value: provenance },
    { label: 'Publisher', value: publisher },
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
    { label: 'Catalog Key', value: catalogKey, external_url: primoLink },
    { label: 'Citation', value: bibliographicCitation },
    { label: 'Folder Name', value: folderName },
    {
      label: 'Folder Number',
      value: folderNumber
    }
  ];

  const adminSetEmail = getAdminSetEmail();
  if (adminSetEmail) {
    findThisItemPanel.push(adminSetEmail);
  }

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
            <CiteTabContent item={props.item} />
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
