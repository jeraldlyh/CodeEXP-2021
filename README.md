# RedDotKakis

> By **ClusterQ**
> - [Charmaine](https://github.com/charmaineneo/)
> - [Shirlyn](https://github.com/shirlynuz/)
> - [Jerald](http://github.com/jeraldlyh/)

Code submission for [BrainHack CodeEXP Hackathon 2021](http://codeexp.tk.sg)

## Problem Statement
**“How can we better adjust and adapt into New Norms in a Post-Covid world?”**
> COVID-19 has negatively impacted the society, causing many to rely heavily on online food delivery services. Businesses (_i.e. provision shops, hawker centres_) that have yet to shift to digitalization are struggling to tide through this tough period.

## **What we've identified**
> It has always been a challenge for local shop owners (_especially hawkers/seniors_) to get on board the digital bandwagon due to the high barrier of entry caused by the lack of technological knowledge.
> In addition, the cultural aspect ("kampung spirit") in Singapore has become less prominent as we transit into the 4th Industrial Revolution which brought about negative social impacts to the society.

## **Target Audience**
- Provision shops
- Hawker shops
- Singapore local community

## **Solution**
***Provision/hawker Shops***
> Provide a delivery platform to present business opportunities for shops.
> Low barrier to entry as shop owners are not required to have prior techonlogical knowledge to utilise the application.

***Singapore local community***
> Community-based application that adopts the concept of _Wikipedia_ where information are provided by the users.
> Peer-2-Peer platform for users where they are able to incentivise others requesting for the delivery service.
> Users are able to earn extra source of income as they are able to conveniently purchase additional items along their way to fulfill the orders on the application.

## Future Improvements
- Automated vetting process to validate shop information prior to listing shops in the menu
- Active menu filtering that loads orders which are in close proximity for convenience
- Integrate a point of sale system for smooth transaction of payments
- Crowd monitoring system which the data is provided by users (similar to [Waze](https://www.waze.com/apps/))

---
## **Technology Stack**
- [React Native](https://reactnative.dev/)
- [Firestore](https://firebase.google.com/docs/firestore)
- [TailwindCSS](https://tailwindcss.com/)

## Local Deployment
#### Expo
Install [Expo](https://docs.expo.io/get-started/installation/):
- `npm install --global expo-cli`

#### Firestore
Firestore setup guide [here](https://firebase.google.com/docs/firestore/quickstart)

![image](https://user-images.githubusercontent.com/37609749/122356081-0b2c8880-cf85-11eb-97bd-5dac71a1b36f.png)
- Navigate to `/database/firebaseDB.js` and copy the above config into the file

#### Installation of Packages
Run the following command in the terminal `npm install`

#### Insertion of Dummy Data
- Insert the following code into `/components/LandingPageScreen.js` and execute `expo start` in your terminal
```
import { addShop } from '../database/actions/Shop';
import data from "../database/data.json";

for (var key in data) {
    addShop(data[key]);
};
```

## Disclaimer
- We do not own or license any copyrights in the images used in the application. You may use the Services and the contents contained in the Services soley for your own individual non-commercial and informational purposes only.
- This application is completed within 72 hours of the commencement of the hackathon, coding conventions are not well-practiced in the repository.
