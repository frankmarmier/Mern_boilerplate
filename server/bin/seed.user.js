const mongoose = require("mongoose");

require("dotenv").config();
require("../config/dbConnection");

const UserModel = require("./../models/User");

const bcrypt = require("bcrypt");


const users = [
    {
        firstName: "Bertrand",
        lastName: "Touré",
        email: "bertrand.toure@essec.fr",
        password: bcrypt.hashSync("1234", salt),
        isAlumni: true,
        industry: "e-commerce",
        work: "Marketing Manager",
        studies: "Essec Business School",
        oldAdress: "5 Boulevard Beaumarchais 92230 Gennervilliers",
        coordinates: [48.931814, 2.286697],
        neighborhoord: "les courtilles",
        description: "I spent 2 years as an Analyst at Wavestone, with a Master's degree at Audencia Business School ( France's top 6 business school). Then, in parallel with an associative involvement, I mature my professional project and entered intensive training . Trained and certified, I quickly put my knowledge to work within my last experience as a Proxy Product Owner. Now, along with studies imbued by English, I am seeking opportunities abroad.",
},
{
    firstName: "Bertrand",
    lastName: "Touré",
    email: "bertrand.toure@essec.fr",
    password: bcrypt.hashSync("1234", salt),
    isAlumni: true,
    industry: "e-commerce",
    work: "Marketing Manager",
    studies: "Essec Business School",
    oldAdress: "17 Rue Henri Poincaré, 92600 Asnières-sur-Seine",
    coordinates: [48.932547, 2.277653],
    neighborhoord: "Hauts d'Asnières",
    description: "I spent 2 years as an Analyst at Wavestone, with a Master's degree at Audencia Business School ( France's top 6 business school). Then, in parallel with an associative involvement, I mature my professional project and entered intensive training . Trained and certified, I quickly put my knowledge to work within my last experience as a Proxy Product Owner. Now, along with studies imbued by English, I am seeking opportunities abroad.",
},
{
    firstName: "Bertrand",
    lastName: "Touré",
    email: "bertrand.toure@essec.fr",
    password: bcrypt.hashSync("1234", salt),
    isAlumni: true,
    industry: "e-commerce",
    work: "Marketing Manager",
    studies: "Essec Business School",
    oldAdress: "57 Rue Louis Calmel, 92230 Gennevilliers",
    coordinates: [48.923796, 2.288109],
    neighborhoord: "Agnettes",
    description: "I spent 2 years as an Analyst at Wavestone, with a Master's degree at Audencia Business School ( France's top 6 business school). Then, in parallel with an associative involvement, I mature my professional project and entered intensive training . Trained and certified, I quickly put my knowledge to work within my last experience as a Proxy Product Owner. Now, along with studies imbued by English, I am seeking opportunities abroad.",
},
{
    firstName: "Bertrand",
    lastName: "Touré",
    email: "bertrand.toure@essec.fr",
    password: bcrypt.hashSync("1234", salt),
    isAlumni: true,
    industry: "e-commerce",
    work: "Marketing Manager",
    studies: "Essec Business School",
    oldAdress: "10 Avenue des Trois Frères, 92600 Asnières-sur-Seine",
    coordinates: [48.920826, 2.285064],
    neighborhoord: "Grésillons Voltaire I - Gabriel Péri",
    description: "I spent 2 years as an Analyst at Wavestone, with a Master's degree at Audencia Business School ( France's top 6 business school). Then, in parallel with an associative involvement, I mature my professional project and entered intensive training . Trained and certified, I quickly put my knowledge to work within my last experience as a Proxy Product Owner. Now, along with studies imbued by English, I am seeking opportunities abroad.",
},
{
    firstName: "Bertrand",
    lastName: "Touré",
    email: "bertrand.toure@essec.fr",
    password: bcrypt.hashSync("1234", salt),
    isAlumni: true,
    industry: "e-commerce",
    work: "Marketing Manager",
    studies: "Essec Business School",
    oldAdress: "53 Rue du Ménil, 92600 Asnières-sur-Seine",
    coordinates: [48.9187954647183, 2.2864481702683537],
    neighborhoord: "Grésillons Voltaire II - Grésillons",
    description: "I spent 2 years as an Analyst at Wavestone, with a Master's degree at Audencia Business School ( France's top 6 business school). Then, in parallel with an associative involvement, I mature my professional project and entered intensive training . Trained and certified, I quickly put my knowledge to work within my last experience as a Proxy Product Owner. Now, along with studies imbued by English, I am seeking opportunities abroad.",
},
];

UserModel.create(users)
    .then ((response) => console.log(response))
    .catch((error) => console.log(error));
