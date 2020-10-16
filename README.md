# DOMESTIC WATER MONITORING DASHBOARD

[![Netlify Status](https://api.netlify.com/api/v1/badges/e3414446-9c12-4ee8-a511-5a381ce32339/deploy-status)](https://app.netlify.com/sites/water-quality-dashboard/deploys)

## Introduction
### What does the application do?
This is the frontend application to a Domestic Water Quality Monitoring system I built using Arduino. The system comprises of 3 sensors, i.e. pH, turbidity and temperature, NodeMCU and an Arduino UNO. Together, they log sensor data and relay it to a channel created on the [ThingSpeak IoT](https://thingspeak.com/) platform. 

### Functionality
- The app displays the current status of the most recent pH and turbidity values fed into the system.
- It also fetches graphs from the ThingSpeak channel and displays them on the site.
- It displays a table of the sensor values being logged at different time intervals.
- It notifies the user of the most recent outlier changes in the parameters by email

## Installation

### Prerequisites
- [Yarn](https://yarnpkg.com/) as the package manager of choice.

### To get the project:
- Clone the repository using `git clone https://github.com/d-rita/my-water-dashboard.git`
- Change into directory using `cd my-water-dashboard`

### To run the app:
- Install dependencies using `yarn add` 
- Use `yarn start` to run the app on your local machine

### Live App
- This app is hosted [here](https://water-quality-dashboard.netlify.app)

## Author
* [**Diana Nanyanzi**](https://github.com/d-rita)
