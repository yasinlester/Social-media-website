amerConnect: Social Media for Gamers
Project Overview
GamerConnect (also known as Gamingtok) is a single-page social media platform designed exclusively for gamers to share their achievements, interact with fellow gaming enthusiasts, and stay updated on gaming news. This project was developed as part of the CST2120 coursework and received a grade of 77/100, achieving a First-class distinction.
The primary goal of this project was to create a gaming community where users could follow other players and content creators. While some features like direct messaging and video calls weren't implemented due to time and skill constraints, the core functionality of account creation, login, and sharing accomplishments is in place.
Project Demonstration

For a visual overview of the project and its functionalities, please watch our demonstration video:

https://youtu.be/yIDlfLsMMlM?si=2YCRwy6DdQyNx_-P



Final Report
For a comprehensive overview of the project, including the development process please look at the proposal.
For challenges faced and future considerations, please refer to the final project report. 

The link is here https://1drv.ms/w/s!Avh-92XC2p9xgZ4eZ_zY4YTdCFFWSQ?e=HfMzc1


Key Features

Single-Page Application: Users can perform all actions without leaving the main page, enhancing user experience and engagement.
User Authentication: Basic login and registration system implemented.
Blog Posting: Users can share their gaming achievements through posts with images.
MongoDB Integration: User data is stored in a MongoDB database.

Technical Details

Frontend: Single-page application built with HTML, CSS, and JavaScript.
Backend: Node.js with Express.js for API endpoints.
Database: MongoDB (Database name: gamigtok1)
Collections:

User collection
User posts collection
Comment collection


Security, Privacy, and Legal Considerations
The project currently has several security and privacy issues that need to be addressed:

Password Storage: Passwords are currently stored unencrypted in the MongoDB database. This is a critical security risk that needs urgent attention.
Data Protection: The lack of password encryption may violate data protection regulations like GDPR and CCPA.
Input Validation: Basic HTML and JavaScript validation is implemented in the registration and login forms, helping prevent some common attacks.
Login Security: Generic error messages are used for failed logins to enhance security.

Planned improvements:

Implement robust password hashing and salting.
Serve the website over HTTPS.
Enhance MongoDB configuration security.
Conduct regular security audits.
Implement multi-factor authentication.
Educate users about strong password practices.

For a full discussion of security, privacy, and legal considerations, please refer to the final report.

the link is here https://1drv.ms/w/s!Avh-92XC2p9xgZ4eZ_zY4YTdCFFWSQ?e=HfMzc1

Installation and Setup



Clone the repository
Install dependencies: npm install
Set up MongoDB and update connection string
Run the server: npm start

API Endpoints
The project uses several GET and POST endpoints. Screenshots of these endpoints tested in Thunder Client and Postman are available in the final report.
Future Enhancements

Implement user follow functionality
Add direct messaging between users
Integrate video call capabilities
Implement real-time chat functionality
Add game integration for automatic achievement posting
Expand news sources and personalize news feed

Testing
Comprehensive testing screenshots are available in the final report.
Contributors

Yasin Lester 

This project was developed as part of the CST2120 coursework at Middlesex University.
