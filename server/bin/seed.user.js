const mongoose = require("mongoose");

require("dotenv").config();
require("../config/dbConnection");

const UserModel = require("./../models/User");

const bcrypt = require("bcrypt");
const salt = 10;

const users = [
    {
        firstName: "Bertrand",
        lastName: "Touré",
        status: "alumni",
        email: "bertrand.toure@essec.fr",
        password: bcrypt.hashSync("1234", salt),
        formattedAddress: "5 Boulevard Beaumarchais 92230 Gennervilliers",
        locationUser: {coordinates : [48.931814, 2.286697]},
        neighborhood: "les Courtilles",
        description: "I spent 2 years as an Analyst at Wavestone, with a Master's degree at Audencia Business School ( France's top 6 business school). Then, in parallel with an associative involvement, I mature my professional project and entered intensive training . Trained and certified, I quickly put my knowledge to work within my last experience as a Proxy Product Owner. Now, along with studies imbued by English, I am seeking opportunities abroad.",
        industry: "e-commerce",
        work: "Marketing Manager",
        studies: "Essec Business School",
        linkedin: "https://www.linkedin.com/in/st%C3%A9phane-mbesse/",
        city: "Asnieres-sur-Seine",
        dept: "Hauts-de-Seine ",
        codeDept: "92",
},
{
    firstName: "Bertrand",
    lastName: "Touré",
    status: "alumni",
    email: "bertrand.toure@essec.fr",
    password: bcrypt.hashSync("1234", salt),
    formattedAddress: "5 Boulevard Beaumarchais 92230 Gennervilliers",
    locationUser: {coordinates : [48.931814, 2.286697]},
    neighborhood: "les Courtilles",
    description: "I spent 2 years as an Analyst at Wavestone, with a Master's degree at Audencia Business School ( France's top 6 business school). Then, in parallel with an associative involvement, I mature my professional project and entered intensive training . Trained and certified, I quickly put my knowledge to work within my last experience as a Proxy Product Owner. Now, along with studies imbued by English, I am seeking opportunities abroad.",
    industry: "e-commerce",
    work: "Marketing Manager",
    studies: "Essec Business School",
    linkedin: "https://www.linkedin.com/in/st%C3%A9phane-mbesse/",
    city: "Asnieres-sur-Seine",
    dept: "Hauts-de-Seine ",
    codeDept: "92",
},
{
    firstName: "Bertrand",
    lastName: "Touré",
    status: "alumni",
    email: "bertrand.toure@essec.fr",
    password: bcrypt.hashSync("1234", salt),
    formattedAddress: "5 Boulevard Beaumarchais 92230 Gennervilliers",
    locationUser: {coordinates : [48.931814, 2.286697]},
    neighborhood: "les Courtilles",
    description: "I spent 2 years as an Analyst at Wavestone, with a Master's degree at Audencia Business School ( France's top 6 business school). Then, in parallel with an associative involvement, I mature my professional project and entered intensive training . Trained and certified, I quickly put my knowledge to work within my last experience as a Proxy Product Owner. Now, along with studies imbued by English, I am seeking opportunities abroad.",
    industry: "e-commerce",
    work: "Marketing Manager",
    studies: "Essec Business School",
    linkedin: "https://www.linkedin.com/in/st%C3%A9phane-mbesse/",
    city: "Asnieres-sur-Seine",
    dept: "Hauts-de-Seine ",
    codeDept: "92",
},
{
    firstName: "Bertrand",
    lastName: "Touré",
    status: "alumni",
    email: "bertrand.toure@essec.fr",
    password: bcrypt.hashSync("1234", salt),
    formattedAddress: "5 Boulevard Beaumarchais 92230 Gennervilliers",
    locationUser: {coordinates : [48.931814, 2.286697]},
    neighborhood: "les Courtilles",
    description: "I spent 2 years as an Analyst at Wavestone, with a Master's degree at Audencia Business School ( France's top 6 business school). Then, in parallel with an associative involvement, I mature my professional project and entered intensive training . Trained and certified, I quickly put my knowledge to work within my last experience as a Proxy Product Owner. Now, along with studies imbued by English, I am seeking opportunities abroad.",
    industry: "e-commerce",
    work: "Marketing Manager",
    studies: "Essec Business School",
    linkedin: "https://www.linkedin.com/in/st%C3%A9phane-mbesse/",
    city: "Asnieres-sur-Seine",
    dept: "Hauts-de-Seine ",
    codeDept: "92",
},
{
    firstName: "Bertrand",
    lastName: "Touré",
    status: "alumni",
    email: "bertrand.toure@essec.fr",
    password: bcrypt.hashSync("1234", salt),
    formattedAddress: "5 Boulevard Beaumarchais 92230 Gennervilliers",
    locationUser: {coordinates : [48.931814, 2.286697]},
    neighborhood: "les Courtilles",
    description: "I spent 2 years as an Analyst at Wavestone, with a Master's degree at Audencia Business School ( France's top 6 business school). Then, in parallel with an associative involvement, I mature my professional project and entered intensive training . Trained and certified, I quickly put my knowledge to work within my last experience as a Proxy Product Owner. Now, along with studies imbued by English, I am seeking opportunities abroad.",
    industry: "e-commerce",
    work: "Marketing Manager",
    studies: "Essec Business School",
    linkedin: "https://www.linkedin.com/in/st%C3%A9phane-mbesse/",
    city: "Asnieres-sur-Seine",
    dept: "Hauts-de-Seine ",
    codeDept: "92",
},
];

UserModel.create(users)
    .then ((response) => console.log(response))
    .catch((error) => console.log(error));
