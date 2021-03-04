// import class Employee
const Employee = require("./Employee");

// class Engineer extends Employee
class Engineer extends Employee{
    // constructor
    constructor(name, id, email, github){
        // call of super
        super(name, id, email);
        this.github = github;
    }
    // getGithub method
    getGithub(){
        return this.github;
    }
    // getRole method overriden
    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer;