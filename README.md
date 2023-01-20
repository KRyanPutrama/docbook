# Installation

This project assume that you have the neccessary tools such as:

 - Node v16+
 - Java jdk
 - Android studio for android
 - Xcode for iOS

**If you haven't, it is suggested that you follow [this](https://reactnative.dev/docs/environment-setup) documentation first.**

---

for module installation, you can run:
  
```
  yarn install
```

or

```
  npm install
```

and additionaly for iOS

```
  cd ios && pod install
```

---

To run the project on

### Android
```
  yarn android
```
or 
```
  npm android
```

### iOS

```
  yarn ios
```

or

```
  npm ios
```

> ***Due to device limitation, author can only assume it works fine on Android, please contact the author if you have trouble to run on iOS***

<br />
<br />

# Choice of packages
## [React-Navigation](https://reactnavigation.org/)
### This package is used for navigation or switching between screens
### Pros
- highly customized behavior
- have native stack for smoother or better performance
### cons
- each modules represent type of screen (e.g Stack, BottomTab). this also implies the core module need another modules to be used.

### assumption on using this package
- for better UX

## [Redux toolkit](https://redux-toolkit.js.org/)
### This package is used for state management, passing and fetching data with built-in middleware
### Pros
- faster setup
- have built in middleware (redux-thunk)
### Cons
- less cusomizable than using redux core and other dependant modules

### assumption on using this package
- for easier passing props directly from store to component/screen rather than nested passing
- asyncronus process with middleware for data fetching
- better state management

## [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
This package is used for animation.#
### Pros
- better performance and selective run on the threads (UI/JS)
- highly customizeable behavior
### Cons
- Animation is awesome so from author biased opinion said none

### assumption on using this package
- better UI
- also again this is animation, so its cool

## [Moment](https://momentjs.com/)
This package is used for date related format or data processing.
### Pros
- easier to format
- have many options
### Cons
- this package seems to not being maintained again so there's a chance that in the future, it will break the app.

### assumption on using this package
- there's a lot data processing with date as the data, this package is perfect for the need.

<br />

# Potential Improvement
- Adding authentication flow will be the first improvement that the author wants to have. it also enable app to have more security for user data protection. 
- better UI 
- better failed or error data fetching
- better flow for appointment
- location features for better UX

<br />

# Production consideration
- setup proguard
- setup store key
- setup env 
- setup distribute service
- also do Potential Improvement Section

# Assumption
Assumptions made through out the project are:
- timeslot data processing
- only listening status code 200, 201 for successful api hit

<br />
<br />

# Testing
### Booking flow
1. go to Home screen
2. select a docter from list
3. press make booking dropdown
4. filled in name
5. select day and timeslot
6. press make booking button

### Cancel flow
1. go to Booking screen
2. press cancel from an appointment on the list


___
<br />

## P.S
## **Author will find it helpful for any suggestion or critics for this project** 





