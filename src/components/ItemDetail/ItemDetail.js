import React from 'react';
import TabPanel from './TabPanel';

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
    extra_fields: { box: { name: box_name } } = null,
    extra_fields: { box: { number: box_number } } = null,
    extra_fields: { folder: { name: folder_name } } = null,
    extra_fields: { folder: { number: folder_number } } = null,
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
      <div id="tab-container">
        <ul id="tabs" role="tablist">
          <li role="presentation">
            <a
              aria-controls="tab-panel1"
              href="#tab-panel1"
              id="tab1"
              role="tab"
            >
              About this Item
            </a>
          </li>
          <li role="presentation">
            <a
              aria-controls="tab-panel2"
              href="#tab-panel2"
              id="tab2"
              role="tab"
            >
              Find this Item
            </a>
          </li>
          <li role="presentation">
            <a
              aria-controls="tab-panel3"
              href="#tab-panel3"
              id="tab3"
              role="tab"
            >
              Cite this Item
            </a>
          </li>
        </ul>
        <div id="tab-content">
          <div aria-labelledby="tab-item-data" id="tab-panel1" role="tabpanel">
            <TabPanel items={metadataPanel} />
          </div>
          <div aria-labelledby="tab-find-item" id="tab-panel2" role="tabpanel">
            <TabPanel items={findThisItemPanel} />
          </div>
          <div aria-labelledby="tab-cite" id="tab-panel3" role="tabpanel">
            <div className="cite-group-col">
              <div className="cite-group">
                <TabPanel items={citePanel} />
              </div>
            </div>
            <div className="cite-group-col">
              <div className="cite-group">
                <TabPanel items={citationFormats} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetail;
