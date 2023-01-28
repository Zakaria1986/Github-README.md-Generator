const fs = require('fs');
const path = require('path');
const inquirer = require("inquirer");
const axios = require("axios");
const generateMarkdown = require("./utils/generateMarkdown");


const promtQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'Please enter the title of my project?'
    },
    {
        type: 'input',
        name: 'instalation',
        message: 'Please enter installation instruction?'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please enter usage inscturction?'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please select the right License from the list?',
        choices: ['MIT', 'ODbL', 'PDDL', 'WTFPL', 'Microsoft Public License',],
        default: 'MIT'
    },
    {
        type: 'input',
        name: 'contributor',
        message: 'Contributor intructions?'
    },
    {
        type: 'input',
        name: 'gitProfileName',
        message: 'Please enter your git profile name?'
    },
    {
        type: 'input',
        name: 'enterEmail',
        message: 'Please enter your email?',
        validate: function (email) {
            // Regex mail check (return true if valid mail)
            let validatedEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
            console.log('Please enter valid email address');
            return validatedEmail;
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Testing instruction?'
    },
    {
        type: 'input',
        name: 'furtherQA',
        message: 'Further questions guide?'
    }
];

// Table contents 
var tableContent = function () {
    let cont = `##able of Contents\n`
    for (var i = 0; i < promtQuestions.length; i++) {
        cont += `${i + 1}. [${promtQuestions[i].message}](#${promtQuestions[i].name}-${i})\n`
    }
    return cont;
}

// const contOutPut = tableContent();
// console.log(contOutPut);



// The promt functon
async function inquirerFunc() {
    inquirer
        .prompt(promtQuestions)
        .then(answers => {

            var promtAnswers = []

            promtAnswers.push({
                title: answers.title,
            },
                {
                    instalation: answers.instalation,
                },
                {
                    usage: answers.usage,
                },
                {
                    license: answers.license,
                },
                {
                    contributor: answers.contributor,
                },
                {
                    gitProfileName: answers.gitProfileName,
                },
                {
                    enterEmail: answers.enterEmail,
                },
                {
                    tests: answers.tests,
                },
                {
                    furtherQA: answers.furtherQA,
                });

            createReadMeFile(promtAnswers)
        });
}


function createReadMeFile(data) {


    let genrateFucReturn = generateMarkdown(data, promtQuestions, tableContent);

    console.log(genrateFucReturn);

    // Read files to see if the file name exist, if it does then delete the file before creating a new file
    fs.writeFile('README.md', genrateFucReturn, err => {
        if (err) {
            return console.log(err);
        }
        console.log("Success! Your README.md file has been generated")
    });
}


// * When a user enters a description, installation instructions, usage information, contribution guidelines,
//   and test instructions then this information is added to the sections of the README entitled Description, 
//   Installation, Usage, Contributing, and Tests

// * When a user chooses a license for their application from a list of options then a badge for that 
// license is added near the top of the README and a notice is added to the section of the README
// entitled **License** that explains which license the application is covered under

//  * When a user enters their GitHub username then this is added to the section of the README 
//    entitled Questions, with a link to their GitHub profile

//  * When a user enters their email address then this is added to the section of the README entitled Questions,
//    with instructions on how to reach them with additional questions

//  * When a user clicks on the links in the **Table of Contents** 
//  then they are taken to the corresponding section of the README

// function to write README file

// function to initialize program
function init() {
    inquirerFunc();
}
// function call to initialize program
init();
