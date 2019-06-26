import firebase from 'react-native-firebase';




 let opt = {
      databaseURL: "https://eldercare-5e4c8.firebaseio.com",
      projectId: "eldercare-5e4c8",
      apiKey: "AIzaSyBhgCvEUPBxv4JoqairKRVR8ijSnDKED-M",
      appId: "1:49718683704:android:04076a44890009c8",
      messagingSenderId: "49718683704",
      storageBucket: "eldercare-5e4c8.appspot.com",
      clientId: "49718683704-ipl6t2j9c9rtub3hisae556k4l04fjji.apps.googleusercontent.com",
      persistence: true,
};
firebase.initializeApp(opt);


let elderCare = firebase.initializeApp(opt, 'elder_care_mobile');
export {elderCare};