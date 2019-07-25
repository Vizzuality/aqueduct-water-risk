import React, { PureComponent } from 'react';

class DocumentationPage extends PureComponent {

  render() {
    return (
      <div className="l-documentation-page">
        <div className="row">
          <div className="column small-12">
            <div className="c-text">
              {/* coordinates */}
              <div className="text-section">
                <h2>Instructions for using files with coordinates.</h2>
              </div>

              <div className="text-subsection">
                <h3>Q: How should I format my excel address file?</h3>
                <p>A: Your excel file should contain three columns: location name, latitude and longtidue.
                  See the <a href="https://github.com/wri/aqueduct_analyze_locations/raw/master/input_templates/example_coordinates.xlsx">template</a>.
                </p>
              </div>

              <div className="text-subsection">
                <h3>Q: Which coordinate notation should I use?</h3>
                <p>A: use latitude and longitude in decimal degrees.</p>
              </div>

              {/* addresses */}
              <div className="text-section">
                <h2>Instructions for using files with addresses.</h2>
              </div>

              <div className="text-subsection">
                <h3>Q: How should I format my excel address file?</h3>
                <p>A: Your excel file should contain two columns: location name and address.
                  See the <a href="https://github.com/wri/aqueduct_analyze_locations/raw/master/input_templates/example_address.xlsx">template</a>.
                </p>
                <p>If your address components (street name, city, county) are in different columns, you should merge them into a single column. See the questions below on how to merge columns.</p>
              </div>

              <div className="text-subsection">
                <h3>Q: I have an excel file where street name, city and country are in separate columns, how can I combine them into one column?</h3>
                <p>A: In Excel and Google Sheets, you can use <code>=TEXTJOIN()</code></p>
                <p>As delimiter you can use a comma “,” or a comma and space “, “ for ignore_empty you can use <code>TRUE=TEXTJOIN(&quot;, &quot;,TRUE,A2:D2)</code></p>
                <p>Change the range <code>(A2:D2)</code> to match your input data.</p>
                <p>Finally, copy the values (not the formulas) of the site name and address columns to a new excel file and safe as .csv or .xlsx.
                  To copy the values only, selected both columns by holding Ctrl and paste using Ctrl+Alt+V
                </p>
              </div>

              <div className="text-subsection">
                <h3>Q: What is the preferred address format?</h3>
                <p>A: Your address format should be in the following <a href="https://developers.google.com/maps/faq#geocoder_queryformat" target="_blank" rel="noopener noreferrer">format</a>:</p>
                <ol>
                  <li>Specify addresses in accordance with the format used by the national postal service of the country concerned.</li>
                  <li>Do <b>not</b> specify additional address elements such as business names, unit numbers, floor numbers, or suite numbers that are not included in the address as defined by the postal service of the country concerned.</li>
                  <li>Use the street number of a premise in preference to the building name where possible.</li>
                  <li>Use street number addressing in preference to specifying cross streets where possible.</li>
                  <li>Do not provide &apos;hints&apos; such as nearby landmarks.</li>
                </ol>

                <p>You can test individual addresses <a href="https://google-developers.appspot.com/maps/documentation/utils/geocoder/" target="_blank" rel="noopener noreferrer">here</a>.</p>
              </div>

              <div className="text-subsection">
                <h3>Q: I don’t know the exact street name, what should I do?</h3>
                <p>A: Results are only as good as the input data so always try to check your input data before running the analysis.
                  We use the centroid of the spatial unit defined by the user. If the user specifies a city without a street, we use
                  the centroid of the city. Always be as specific as possible.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DocumentationPage;
