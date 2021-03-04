// import class Employee
const Employee = require("./Employee");

// class Manager extends parent class Employee
class Manager extends Employee{
    // constructor
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    // getOfficeNumber() method
    getOfficeNumber(){
        return this.officeNumber;
    }

    // getRole method overriden
    getRole(){
        return "Manager";
    }
}

module.exports = Manager;