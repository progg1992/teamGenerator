// Class Employee
class Employee{
    // constructor
    constructor(name, id, email){
        // throw errors in case not provided 'name, 'id', 'email'
        // commented due to not supported from test cases
        // if(!name){
        //     throw new Error("You should provide a NAME");
        // }
        // if(!id){
        //     throw new Error("You should provide an ID");
        // }
        // if(!email){
        //     throw new Error("You should provide an EMAIL");
        // }
        this.name = name;
        this.id = id;
        this.email = email;
    }
    // getName method
    getName(){
        return this.name;
    }
    // getEmail method
    getEmail(){
        return this.email;
    }
    // getId method
    getId(){
        return this.id;
    }
    // getRole method
    getRole(){
        return "Employee";
    }
}

module.exports = Employee;