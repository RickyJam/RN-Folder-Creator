const { log } = require("console");
const fileSystem = require("fs");
const { exit } = require("process");

function _generateComponentContent(componentName: String): String {
  return "" +
`import React from 'react';
import PropTypes from 'prop-types';
  
const ${componentName} = () => ();
  
${componentName}.propTypes = {};
  
${componentName}.defaultProps = {};
  
export default ${componentName};
`;
}

function _generateTestContent(componentName: String): String {
  return "" + 
`import React from 'react';
import configuredEnzyme from 'commons/__tests__/__configuration__/configure-enzyme';
import renderer from 'react-test-renderer';
import ${componentName} from '../${componentName}';
  
const { shallow } = configuredEnzyme;
  
describe('${componentName}', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<${componentName} />);
    expect(rendered).toMatchSnapshot();
  });
});
`;
}

async function _createFolder(componentDir: String) {
  await fileSystem.mkdir(componentDir, (err: any) => {
    if (err) {
      log(`Errore!!! Path non esistente: ${componentDir}`);
      log(`Rivedere il path e rilanciare il task!`);
      exit(1);
    }
  });
}

async function _createJsFile(
  componentDir: String,
  componentName: String,
  componentContent: String,
  extensionType: String
) {
  await fileSystem.writeFile(
    `${componentDir}/${componentName}${extensionType}`,
    componentContent,
    () => {}
  );
}

export default async function createComponentFolder(componentName: String, basePath: String) {
  const componentInfo = {
    componentDir: `${basePath}/${componentName}`,
    componentContent: _generateComponentContent(componentName),
    jsExtension: ".js",
  };

  const testDetail = {
    testDir: `${basePath}/${componentName}/__tests__`,
    jsTestExtension: ".test.js",
    testContent: _generateTestContent(componentName),
  };

  await _createFolder(componentInfo.componentDir);
  await _createFolder(testDetail.testDir);

  await _createJsFile(
    componentInfo.componentDir,
    componentName,
    componentInfo.componentContent,
    componentInfo.jsExtension
  );

  await _createJsFile(
    testDetail.testDir,
    componentName,
    testDetail.testContent,
    testDetail.jsTestExtension
  );
}
