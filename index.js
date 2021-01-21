// Load dependencies
const inq = require("inquirer");
const fs = require("fs");

const questions = [
    {type: 'input', name: 'title', message: 'What is the project title? '},
    {type: 'input', name: 'description', message: 'Describe the project in a few sentences: '},
    {type: 'input', name: 'installInstructions', message: 'Describe the process of installing the project: '},
    {type: 'input', name: 'usageInfo', message: 'Give some basic usage information: '},
    {type: 'input', name: 'contribGuidelines', message: 'Give some guidelines for people contributing to the project: '},
    {type: 'input', name: 'testInstructions', message: 'Give instructions for testing: '},
    {type: 'list', name: 'licence', message: 'What licence does the project fall under: ', choices: ["Eclipse Public License 1.0", "GNU GPL v3", "MIT License", "Mozilla Public License 2.0"]},
    {type: 'input', name: 'githubUsername', message: 'What is your github username? '},
    {type: 'input', name: 'email', message: 'What is your contact email address? '},
];

inq.prompt(questions).then(answers => {
    // Use answers to create README

    let licenceBadge = getLicenceBadge(answers.licence);

    let readmeString = 
    `# ${answers.title}
    ${licenceBadge}
    `;

    fs.writeFile('READMETest.md', readmeString, error => {
        error ? console.error(error) : console.log("README.md generated successfully!");
    });
}).catch(error => {
    console.log(error);
});

function getLicenceBadge(licence) {

    switch (licence) {
        case "Eclipse Public License 1.0":
            return '[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)';
        case "GNU GPL v3":
            return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
        case "MIT License":
            return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        case "Mozilla Public License 2.0":
            return '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
    }

}