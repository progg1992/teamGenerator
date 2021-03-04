// import class Employee
const Employee = require("./Employee");

//class Intern extends from parent class Employee
class Intern extends Employee{
    // constructor
    constructor(name, id, email, school){
        // call of super
        super(name, id, email);
        this.school = school;
    }

    // getSchool method
    getSchool(){
        return this.school;
    }

    //getRole Overriden
    getRole(){
        return "Intern";
    }
}

module.exports = Intern;
