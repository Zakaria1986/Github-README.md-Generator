const fs = require('fs');
const path = require('path');
const inquirer = require("inquirer");
const axios = require("axios");
const generateMarkdown = require("./utils/generateMarkdown");


const promtQuestions = () => {
    return [
        {
            type: 'input',
            name: 'title',
            message: 'Please enter the title of the project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please enter the description of the project?'
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
            choices: ['MIT', 'ODbL', 'PDDL', 'WTFPL'],
            default: 'MIT'
        },
        {
            type: 'input',
            name: 'contributor',
            message: 'Contributor intructions?'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Testing instruction?'
        },
        {
            type: 'input',
            name: 'furtherQA',
            message: 'Any further questions ?'
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
        }
    ];
}

//  * When a user clicks on the links in the **Table of Contents**  then they are taken to the corresponding section of the README
const tableContent = (arr) => {

    // let promtQuestsTableCont = promtQuestions();

    let cont = `## Table of Contents\n<br>`
    for (var i = 0; i < arr.length; i++) {
        cont += `\t\t${i + 1}. [${arr[i].name.charAt(0).toUpperCase() + arr[1].name.slice(1)}](#${arr[i].name}-${i})\n<br>`;
    }
    return cont;
}

// const contOutPut = tableContent();
// console.log(contOutPut);

// The promt functon
async function inquirerFunc() {


    const promtQuests = await promtQuestions();
    const tableConts = await tableContent(promtQuests);



    return inquirer
        .prompt(promtQuests)
        .then(answers => {

            var promtAnswers = []

            promtAnswers.push(
                {
                    title: answers.title,
                },
                {
                    description: answers.description,
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
                    tests: answers.tests,
                },
                {
                    furtherQA: answers.furtherQA,
                },
                {
                    gitProfileName: answers.gitProfileName,
                },
                {
                    enterEmail: answers.enterEmail,
                }
            );

            createReadMeFile(promtAnswers, promtQuests, tableConts)
        });
}


async function createReadMeFile(data, promtQuest, tableCont) {


    let genrateFucReturn = generateMarkdown(data, promtQuest, tableCont);

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




// function to initialize program
async function init() {
    await inquirerFunc();
}
// function call to initialize program
init();
