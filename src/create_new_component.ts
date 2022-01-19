const fileSystem = require("fs");
import { exit } from "process";
import * as vscode from 'vscode';

const outputChannel = vscode.window.createOutputChannel("FolderCreator");

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
  outputChannel.appendLine(`Creazione directory ${componentDir}`);
  await fileSystem.mkdir(componentDir, (err: any) => {
    if (err) {
      outputChannel.appendLine(`Creazione directory fallita, uscita`);
      outputChannel.appendLine(err);
      exit(1);
    }
    outputChannel.appendLine(`Creazione directory - OK`);
  });
}

async function _createJsFile(
  componentDir: String,
  componentName: String,
  componentContent: String,
  extensionType: String
) {
  outputChannel.appendLine(`Scrittura file ${componentName}${extensionType}`);
  await fileSystem.writeFile(
    `${componentDir}/${componentName}${extensionType}`,
    componentContent,
    (err: any) => {
      if(err) {
        outputChannel.appendLine(`Scrittura file fallita, uscita!`);
        outputChannel.appendLine(err);
        exit(1);
      }
      outputChannel.appendLine(`Scrittura file ${componentName}${extensionType} - OK `);
    }
  );
}

export default async function createComponentFolder(componentName: String, basePath: String) {
  //TODO andrebbe fatta la dispose alla fine?
  outputChannel.show(true);
  outputChannel.clear();

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
