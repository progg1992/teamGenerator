const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



const teamMembers = [];
const arrayID = [];

// Menu function
function menu() {
    // Using inquirer to gather information about the development team members,
    // and to create objects for each team member

    // add Manager function
    function addManager() {
        console.log("Build your team: ");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your name?",
                validate: answer => {
                    if (answer != "") {
                        return true;
                    }
                    return "Please enter your name!";
                }
            },
            {
                type: "input",
                name: "managerID",
                message: "What is your manager ID?",
                validate: answer => {
                    const id = answer.match(/^[1-9]\d*$/);
                    if (id) {
                        return true;
                    }
                    return "Please enter a valid ID!"
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager email?",
                validate: answer => {
                    const email = answer.match(/\S+@\S+\.\S+/);
                    if (email) {
                        return true;
                    }
                    return "Please enter a valid email address!";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is you manager office number?",
                validate: answer => {
                    const num = answer.match(/^[1-9]\d*$/);
                    if (num) {
                        return true;
                    }
                    return "Please enter a valid phone number!";
                }
            }
        ]).then(answers => {
            // create Manager object
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            arrayID.push(answers.managerID);
            createTeam();
        });
    }
    // create team function
    // usega of switch case to give the user a choice option of team members
    function createTeam() {
        // prompt the team member
        inquirer.prompt([
            {
                type: "list",
                name: "chooseMember",
                message: "What type of member would you add to team?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any member"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.chooseMember) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildUpTeam();
            }
        });
    }

    // add Engineer function
    function addEngineer() {
        // prompt answers from user
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your Engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter character value!";
                }
            },
            {
                type: "input",
                name: "engineerID",
                message: "What is engineer's ID?",
                validate: answer => {
                    const id = answer.match(/^[1-9]\d*$/);
                    if (id) {
                        if (arrayID.includes(answer)) {
                            return "This ID has already been used!";
                        } else {
                            return true;
                        }
                    }
                    return "Please provide a valid number ID";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is engineer's email?",
                validate: answer => {
                    const email = answer.match(/\S+@\S+\.\S+/);
                    if (email) {
                        return true;
                    }
                    return "Please eneter a valid email address!";
                }
            },
            {
                type: "input",
                name: "engineerGit",
                message: "What is engineer's GitHub username?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a character!";
                }
            }
        ]).then(answers => {
            // create Engineer object
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGit);
            teamMembers.push(engineer);
            arrayID.push(answers.engineerID);
            createTeam();
        });
    }
    // add Intern function
    function addIntern() {
        // prompt answers from user
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter character value!";
                }
            },
            {
                type: "input",
                name: "internID",
                message: "What is intern's ID?",
                validate: answer => {
                    const id = answer.match(/^[1-9]\d*$/);
                    if (id) {
                        if (arrayID.includes(answer)) {
                            return "This ID is already been used!";
                        } else {
                            return true;
                        }
                    }
                    return "Please enter a valid number ID!";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is intern's email?",
                validate: answer => {
                    const email = answer.match(/\S+@\S+\.\S+/);
                    if (email) {
                        return true;
                    }
                    return "Please enter a valid emaild address!";
                }
            },
            {
                type: "input",
                name: "school",
                message: "What is intern's school?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter character value!";
                }
            }
        ]).then(answers => {
            // create Intern object
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.school);
            teamMembers.push(intern);
            arrayID.push(answers.internID);
            createTeam();
        });
    }

    // create an HTML file using the HTML
    // returned from the `render` function. Write it to`team.html`file in the
    // `output` folder.
    function buildUpTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    // call addManager()
    addManager();
}
// call menu()
menu();