const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];
const idArray = [];

function init() {
    function initManager() {
        console.log('Please build your team');
        inquirer.prompt([
            {
                type: 'input',
                name: 'managerName',
                message: 'What is your manager\'s name?',
                validate: answer => {
                    if(answer !== '') {
                        return true;
                    }
                    return "Please enter at least one character."
                }
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'What is your manager\'s id?',
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if(pass) {
                        return true;
                    }
                    return "Please eneter a positive number greater than zero";
                }
            },
            {
                type: 'input',
                name: 'managerOfficeNumber',
                message: 'What is your manager\'s office number?',
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if(pass) {
                        return true;
                    }
                    return 'Please enter a positive number greater than zero'
                }
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: 'What is your manager\'s email?',
                validate: answer => {
                    const pass = answer.match(
                        /\$+@\$+\.\$+/
                    );
                    if(pass) {
                        return true;
                    }
                    return 'Please enter a valid email address.'
                }
            }
        ])
        .then(answers => {
            const manager = new Manager(answers.managerName, answers.mangerId, answers.managerOffice, answers.managerEmail);
            employees.push(manager);
            eIdArray.push(answers.managerId);
            selectTeam();
        })
    }

    function selectTeam() {
        inquirer.prompt([
            {
                type: 'List',
                name: 'memberChoice',
                message: 'Please select a team member.',
                choices: [
                    'Engineer',
                    'Intern',
                    'I do not need anymore team members'
                ]
            }
        ])
        .then(employeeChoice => {
            switch(employeeChoice.memberChoice) {
                case 'Engineer':
                    initEngineer();
                    break;
                case 'Intern':
                    initIntern();
                    break;
                default:
                buildTeam()
            }
        });
    }

    function initEngineer() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: 'What is your engineer\'s name?',
                validate: answer => {
                    if(answer !== '') {
                        return true;
                    }
                    return "Please enter at least one character."
                }
            },
            {
                type: 'input',
                name: 'engineerId',
                message: 'What is your engineer\'s id?',
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if(pass) {
                        if(idArray.includes(answer)) {
                            return 'This ID is already in use. Please enter a different ID.';
                        } else {
                            return true;
                        }
                    }
                }
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: 'What is your engineer\'s email?',
                validate: answer => {
                    const pass = answer.match(
                        /\$+@\$+\.\$+/
                    );
                    if(pass) {
                        return true;
                    }
                    return 'Please enter a valid email address.'
                }
            },
            {
                type: 'input',
                name: 'engineerGithub',
                message: 'What is your engineer\'s GitHub username?',
                validate: answer => {
                    if(answer !== '') {
                        return true
                    }
                    return 'Please enter at least one character.';
                }
            }
        ])
        .then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            employees.push(engineer);
            eIdArray.push(answers.engineerId);
            selectTeam();
        })
    }

    function initIntern() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: 'What is your intern\'s name?',
                validate: answer => {
                    if(answer !== '') {
                        return true;
                    }
                    return "Please enter at least one character."
                }
            },
            {
                type: 'input',
                name: 'internId',
                message: 'What is your intern\'s id?',
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if(pass) {
                        if(idArray.includes(answer)) {
                            return 'This ID is already in use. Please enter a different ID.';
                        } else {
                            return true;
                        }
                    }
                }
            },
            {
                type: 'input',
                name: 'internEmail',
                message: 'What is your intern\'s email?',
                validate: answer => {
                    const pass = answer.match(
                        /\$+@\$+\.\$+/
                    );
                    if(pass) {
                        return true;
                    }
                    return 'Please enter a valid email address.'
                }
            },
            {
                type: 'input',
                name: 'internSchool',
                message: 'What school is your intern attending?',
                validate: answer => {
                    if(answer !== '') {
                        return true;
                    }
                    return "Please enter at least one character."
                }
            }
        ])
        .then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            employees.push(intern);
            eIdArray.push(answers.internId);
            selectTeam();    
    })
    }

    function buildTeam() {
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(employees), 'utf-8')
    }

    initManager();

}

init()

