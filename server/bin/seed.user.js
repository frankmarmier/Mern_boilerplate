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
        image:"https://media-exp1.licdn.com/dms/image/C4D03AQFVWM-O6hnNcA/profile-displayphoto-shrink_400_400/0/1593705445712?e=1628726400&v=beta&t=x-0q5FPjSMfY16BiITaEEMt1ymhbPzF7-Z8zstcmP_0",
        status: "alumni",
        email: "bertrand.toure@essec.fr",
        password: bcrypt.hashSync("1234", salt),
        formattedAddress: "5 Boulevard Beaumarchais 92230 Gennervilliers",
        locationUser: {coordinates : [2.286697, 48.931814]},
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
    image:"https://media-exp1.licdn.com/dms/image/C4D03AQFOG6EwbbnlTQ/profile-displayphoto-shrink_400_400/0/1613389125809?e=1628726400&v=beta&t=m8ZmJynhYU4vsAgPKEhlYOlVW3E3d5RcvH5N71p8xu0",
    status: "alumni",
    email: "bertrand.toure@essec.fr",
    password: bcrypt.hashSync("1234", salt),
    formattedAddress: "5 Boulevard Beaumarchais 92230 Gennervilliers",
    locationUser: {coordinates : [2.286697, 48.931814]},
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
    image:"https://media-exp1.licdn.com/dms/image/C4E03AQFuJ2A5QCp_hA/profile-displayphoto-shrink_400_400/0/1617304490981?e=1628726400&v=beta&t=GFhimIX3Q3mh6GVomYl9IuYy-7EMivymkQSuxf10UBo",
    status: "alumni",
    email: "bertrand.toure@essec.fr",
    password: bcrypt.hashSync("1234", salt),
    formattedAddress: "5 Boulevard Beaumarchais 92230 Gennervilliers",
    locationUser: {coordinates : [2.286697, 48.931814]},
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
    image:"https://media-exp1.licdn.com/dms/image/C4D03AQHt9E8M3L-zBQ/profile-displayphoto-shrink_400_400/0/1558938132219?e=1628726400&v=beta&t=mnNA9bBWaK_ujsCN8lMKp6uYNuD_qzxki19U4mQ_eUM",
    email: "bertrand.toure@essec.fr",
    password: bcrypt.hashSync("1234", salt),
    formattedAddress: "5 Boulevard Beaumarchais 92230 Gennervilliers",
    locationUser: {coordinates : [2.286697, 48.931814]},
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
    image:"https://media-exp1.licdn.com/dms/image/C4D03AQF9i8f8tDx_eA/profile-displayphoto-shrink_400_400/0/1598883242756?e=1628726400&v=beta&t=cdTw6pm2lRR-mgzKMalRmlIMEUv5DqkHLcVFmW-Unsg",
    email: "bertrand.toure@essec.fr",
    password: bcrypt.hashSync("1234", salt),
    formattedAddress: "5 Boulevard Beaumarchais 92230 Gennervilliers",
    locationUser: {coordinates : [2.286697, 48.931814]},
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

