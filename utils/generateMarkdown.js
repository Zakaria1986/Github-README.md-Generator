
// https://github.com/EsmondKim/Node.js-NPM-Inquirer-README-Generator/blob/main/index.js
// function to generate markdown for README
// github icons: https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba

const axios = require('axios');
function getUserAccount(gitUserName) {
  return axios.get('/user/12345');
}

function generateMarkdown(data, questions, tableCont) {

  let icon;
  if (data[3].license === "MIT") {
    icon = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
  } else if (data[3].license === "ODbL") {
    icon = '[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)'
  } else if (data[3].license === "PDDL") {
    icon = '[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)'
  } else if (data[3].license === "WTFPL") {
    icon = '[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)'
  }

  let readmeContent = `
  
  # ${data[0].title.charAt(0).toUpperCase() + data[0].title.slice(1)}  <a name="title-0"></a>
  
  ${tableCont}
   
   ## ${questions[1].name.charAt(0).toUpperCase() + questions[1].name.slice(1)} <a name="instalation-1"></a>
      ${data[1].instalation}

   ## ${questions[2].name.charAt(0).toUpperCase() + questions[2].name.slice(1)}<a name="usage-2"></a>
      ${data[2].usage}

   ## ${questions[3].name.charAt(0).toUpperCase() + questions[3].name.slice(1)} <a name="license-3"></a>
      ${icon}

   ## ${questions[4].name.charAt(0).toUpperCase() + questions[4].name.slice(1)} <a name="contributor-4"></a>
      ${data[4].contributor}

      ${data[8].enterEmail}

   ## ${questions[5].name.charAt(0).toUpperCase() + questions[5].name.slice(1)} <a name="gitProfileName-5"></a>
      ${data[5].gitProfileName}

   ## ${questions[6].name.charAt(0).toUpperCase() + questions[6].name.slice(1)} <a name="tests-7"></a>
      ${data[6].tests}

   ## ${questions[7].name.charAt(0).toUpperCase() + questions[7].name.slice(1)} <a name="frutherQA-8"></a>
      ${data[7].furtherQA}
   `

  return readmeContent;

}

module.exports = generateMarkdown;

