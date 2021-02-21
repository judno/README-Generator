const inquirer = require("inquirer");
const fs = require("fs").promises;
const { forEach, values } = require("lodash");
const { error } = require("console");

//map to store license badges
const licenseToBadge = {
  "GNU AGPL v3":
    "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)",
  ISC:
    "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",
  "GNU GPL v3":
    "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
  "Apache 2.0":
    "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
  MIT:
    "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
};

// .prompt with messages from questions array
inquirer
  .prompt([
    {
      name: "title",
      message: "What is the title of your project?",
    },
    {
      name: "description",
      message: "Write a description of your project?",
    },
    {
      name: "installation",
      message: "What are the steps required to install your project?",
    },
    {
      name: "usage",
      message: "Provide instructions and examples for use",
    },
    {
      name: "credits",
      message: "List your collaborators, if any",
    },
    {
      name: "badges",
      message: "What badges did you use?",
    },
    {
      name: "contributing",
      message: "add the guidelines for how to contribute",
    },
    {
      name: "tests",
      message: "how do i test?",
    },
    {
      name: "license",
      type: "list",
      message: "Which License do you wish to use?",
      choices: Object.keys(licenseToBadge),
    },
    {
      name: "github",
      message: "What is your github username?",
    },
    {
      name: "email",
      message: "What is your email address?",
    },
  ])

  //then reformat the answers into markdown
  .then((answers) => {
    console.log(answers);
    console.log();
    let readMeString = `# ${answers.title}
    ${licenseToBadge[answers.license]}
## Table of contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Badges](#badges)
- [Contributing](#contributing)
- [Tests](#tests)
- [Github](#github)
- [Email](#email)
   ## Description
   ${answers.description}
   ## Installation
   ${answers.installation}
   ## Usage
   ${answers.usage}
   ## Credits
   ${answers.credits}
   ## Badges
   ${answers.badges}
   ## Contributing
   ${answers.contributing}
   ## Tests
   ${answers.tests}
   ## Github
   [${answers.github}](https://github.com/${answers.github})
   ## Email
   [Contact me via email](${answers.email})`;
    console.log(readMeString);

    //create readme using the writefile function and console log it was successful

    fs.writeFile("README.md", readMeString).then(console.log("great success!"));
  })
  //catch error and console log error
  .catch((e) => {
    console.log(e);
  });
