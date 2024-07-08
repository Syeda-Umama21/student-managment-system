#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Stylish and colorful heading
console.log(chalk.yellow.bold.underline.italic('\n\t===== Student Management System =====\t\n'));
class Student {
    id;
    name;
    coursesEnrolled;
    feeAmount;
    constructor(id, name, coursesEnrolled, feeAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feeAmount = feeAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
(async () => {
    do {
        let action = await inquirer.prompt({
            type: "list",
            name: "ans",
            message: chalk.bold.italic.blue("Please select an option:\n"),
            choices: ["Enroll a student", "Show student status"]
        });
        if (action.ans === "Enroll a student") {
            let studentName = await inquirer.prompt({
                type: "input",
                name: "ans",
                message: chalk.bold.italic.blue("Please Enter your name:")
            });
            let trimmedStudentName = (studentName.ans).trim().toLowerCase();
            let studentNameCheck = students.map(obj => obj.name);
            if (!studentNameCheck.includes(trimmedStudentName)) {
                if (trimmedStudentName !== "") {
                    baseId++;
                    studentId = "STID" + baseId;
                    console.log(chalk.bold.italic.green("Your account has been created"));
                    console.log(chalk.bold.italic.green(`Welcome, ${trimmedStudentName}`));
                    let course = await inquirer.prompt({
                        type: "list",
                        name: "ans",
                        message: chalk.bold.italic.cyan("Please select a course"),
                        choices: ["IT", "Cooking", "English Language"]
                    });
                    let courseFee = 0;
                    switch (course.ans) {
                        case "IT":
                            courseFee = 50000;
                            break;
                        case "Cooking":
                            courseFee = 2000;
                            break;
                        case "English Language":
                            courseFee = 1000;
                            break;
                    }
                    let courseConfirm = await inquirer.prompt({
                        type: "confirm",
                        name: "ans",
                        message: chalk.bold.italic.cyan("Do you want to enroll in the course?")
                    });
                    if (courseConfirm.ans) {
                        let student = new Student(studentId, trimmedStudentName, [course.ans], courseFee);
                        students.push(student);
                        console.log(chalk.bold.italic.green("You have enrolled in the course."));
                    }
                }
                else {
                    console.log(chalk.bold.italic.red("Invalid Name."));
                    await inquirer.prompt({
                        type: "confirm",
                        name: "ans",
                        message: chalk.bold.italic.green("Do you want to enroll in the course?")
                    });
                }
            }
            else {
                console.log(chalk.bold.italic.red("This name already exists."));
            }
        }
        else if (action.ans === "Show student status") {
            if (students.length !== 0) {
                let studentNameCheck = students.map(z => z.name);
                let selectedStudent = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: chalk.bold.italic.blue("Please select a name"),
                    choices: studentNameCheck
                });
                let findStudent = students.find(Student => Student.name === selectedStudent.ans);
                console.log(chalk.bold.italic.cyan("Student information"));
                console.log(findStudent);
                console.log("\n");
            }
            else {
                console.log(chalk.bold.italic.red("Record is empty."));
            }
            let userConfirm = await inquirer.prompt({
                type: "confirm",
                name: "ans",
                message: chalk.bold.italic.green("Do you want to continue?")
            });
            if (!userConfirm.ans) {
                continueEnrollment = false;
            }
        }
    } while (continueEnrollment);
})();
