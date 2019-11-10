import firebase from "firebase/app";
import "firebase/auth";
import { FIREBASE_CONFIG } from "../core/config";
import { userInfo } from "os";

export const logoutUser = () => {
  firebase.auth().signOut();
};

export const signInUser = async ({ name, email, password }) => {
  // if (!firebase.apps.length) {
  //     // firebase.initializeApp({});
  //     firebase.initializeApp(FIREBASE_CONFIG);
  //     console.log("user found");
  // }

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);

    // console.log(firebase.auth().currentUser.uid,"hellol----");
    firebase.auth().currentUser.updateProfile({
      displayName: name,
    });
    if (!firebase.apps.length) {
    
      firebase.initializeApp(FIREBASE_CONFIG);
      console.log("init again");
    }
      let userId= firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + userId).set({
      productType: "hello"
    })

    // firebase.database().ref('users/').push({
    //   userName : name,
    //   emailName : email,
    //   productType : product
    // });

    // firebase.database().ref(url).push(jsonObject).
    //   then((data) => {
    //     dispatch({ type: "FULFILLED" })
    //     //success
    //   }).
    //   catch((err) => {
    //     dispatch({ type: "REJECTED" })
    //     //error
    //   });




    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return {
          error: "E-mail already in use."
        };
      case "auth/invalid-email":
        return {
          error: "Invalid e-mail address format."
        };
      case "auth/weak-password":
        return {
          error: "Password is too weak."
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute."
        };
      default:
        console.log(error.code, "----error");
        console.log(error.message, "----msg");
        console.log(error, "-----");
        return {
          error: "Check your internet connection."
        };
    }
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        return {
          error: "Invalid email address format."
        };
      case "auth/user-not-found":
      case "auth/wrong-password":
        return {
          error: "Invalid email address or password."
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute."
        };
      default:
        return {
          error: "Check your internet connection."
        };
    }
  }
};

export const sendEmailWithPassword = async email => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        return {
          error: "Invalid email address format."
        };
      case "auth/user-not-found":
        return {
          error: "User with this email does not exist."
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute."
        };
      default:
        console.log("hello", error.code);
        return {

          error: "Check your internet connection."
        };
    }
  }
};