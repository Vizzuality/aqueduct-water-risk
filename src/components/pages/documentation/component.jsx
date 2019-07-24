import React, { PureComponent } from 'react';

class DocumentationPage extends PureComponent {

  render() {
    return (
      <div className="l-documentation-page">
        <div className="row">
          <div className="column small-12">
            <div className="c-text">
              <div className="text-section">
                <h2>Analyze locations instructions</h2>
              </div>
              <div className="text-subsection">
                <h3>Input templates - Coordinates</h3>&nbsp;
                <a download="example_coordinates.csv" href="/files/points/coordinates/example_coordinates.csv">template.csv</a>
              </div>

              <div className="text-subsection">
                <h3>Input templates - Addresses</h3>&nbsp;
                <a download="example_address.csv" href="/files/points/addresses/example_address.csv">template.csv</a>
              </div>

              <div className="text-subsection">
                <h3>Export templates</h3>
                <p>After analyzing the locations, users can export the results.</p>

                <p>The format of the first few columns in the output data depends on whether coordinates or addresses have been used as input.</p>

                <h4>First columns when using coordinates</h4>
                For coordinates, the only difference is a first column with the unique identifier.&nbsp;
                <a
                  href="https://github.com/wri/aqueduct_analyze_locations/blob/master/result_templates/results_first_columns_coordinates.csv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  coordinates template
                </a>

                <h4>First columns when using adresses</h4>
                <p>For addresses, keep both the input and match addresses, latitude and longitude.</p>
                <a
                  href="https://github.com/wri/aqueduct_analyze_locations/blob/master/result_templates/results_first_columns_adrresses.csv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  address template
                </a>

                <h4>Remainder of the columns</h4>
                <p>The remainder of the files / columns should should contain all the results:</p>
                <ol>
                  <li>Annual</li>
                  <li>Monthly</li>
                  <li>Future Projections</li>
                </ol>

                <p>There are a few options:</p>
                <ol>
                  <li>Combine the results in a single .xlsx file with tabs.</li>
                </ol>
                <p>Please try exporting the results after analyzing locations in&nbsp;
                  <a
                    href="https://www.wri.org/applications/maps/aqueduct-atlas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  our rool
                  </a>
                  .
                </p>
                <p>Pros: All data in one place, no encoding issues.</p>

                <ol>
                  <li>Export a zipped folder with the different results in .csv files</li>
                </ol>
                <p>Pros: easier since csv is a Carto standard.</p>
                <p>Cons: However this <b>WILL</b> result in encoding issues. Users will double click the csv file and the UTF-8 endcoding will be lost based on the user locale setting.</p>
                <p>Users need to understand the results so either convert the columns into human readable format, or include the dicitonary format.</p>

                <p>
                  For the annual results: <br />
                  template <br />
                  dictionary <br />
                </p>
                <p>
                  For monthly results:
                  template <br />
                  dictionary <br />
                </p>
                <p>
                  For future projections results: <br />
                  template <br />
                  dictionary
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DocumentationPage;
