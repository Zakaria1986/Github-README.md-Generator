
// https://github.com/EsmondKim/Node.js-NPM-Inquirer-README-Generator/blob/main/index.js
// function to generate markdown for README
// github icons: https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba

const axios = require('axios');
function getUserAccount(gitUserName) {
  return axios.get('/user/12345');
}

function generateMarkdown(data, questions, tableCont) {

  let icon;
  if (data[4].license === "MIT") {
    icon = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
  } else if (data[4].license === "ODbL") {
    icon = `[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)`
  } else if (data[4].license === "PDDL") {
    icon = `[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)`
  } else if (data[4].license === "WTFPL") {
    icon = `[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)`
  }

  let readmeContent = `
  
  # ${data[0].title.charAt(0).toUpperCase() + data[0].title.slice(1)}  <a name="title-0"></a>
  ## ${questions[1].name.charAt(0).toUpperCase() + questions[1].name.slice(1)} <a name="description-1"></a>
  ${data[1].instalation}
  
  ${tableCont}
   
   ## ${questions[2].name.charAt(0).toUpperCase() + questions[1].name.slice(1)} <a name="instalation-2"></a>
      ${data[2].instalation}

   ## ${questions[3].name.charAt(0).toUpperCase() + questions[2].name.slice(1)}<a name="usage-3"></a>
      ${data[3].usage}

   ## ${questions[4].name.charAt(0).toUpperCase() + questions[4].name.slice(1)} <a name="license-4"></a>
      ${icon}

   ## ${questions[5].name.charAt(0).toUpperCase() + questions[5].name.slice(1)} <a name="contributor-5"></a>
      ${data[5].contributor} [Get in touch](mailto:${data[9].enterEmail}

   ## ${questions[6].name.charAt(0).toUpperCase() + questions[6].name.slice(1)} <a name="tests-6"></a>
      ${data[6].tests}

   ## ${questions[7].name.charAt(0).toUpperCase() + questions[7].name.slice(1)} <a name="frutherQA-7"></a>
      ${data[7].furtherQA}

   ## ${questions[8].name.charAt(0).toUpperCase() + questions[8].name.slice(1)} <a name="gitProfileName-8"></a>
      ${data[8].gitProfileName}
   `

  return readmeContent;

}

module.exports = generateMarkdown;

