import firebase from "firebase/app";
import "firebase/auth";
import { FIREBASE_CONFIG } from "../core/config";
/**
 * This takes care of the logout section of the app where once the user
 * presses the logout button in the landingscreen.js screen, it will
 * authenticate and update the Firebase state
 */
export const logoutUser = () => {

  firebase.auth().signOut();
  console.log("user out")
};
/**
 * When a user tries to sign in, this function will take in the name, email,
 * password, and product entries from the user. It then takes these inputs and
 * performs authentication of the current database via Firebase to ensure that
 * the user is valid.
 */
export const signInUser = async ({ name, email, password, product }) => {

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    /**
     * This pulls the current user's display name from the database and autenticates it
     */
    firebase.auth().currentUser.updateProfile({
      displayName: name,
    });

    let userId = firebase.auth().currentUser.uid;
    /**
     * If a user account creation is valid the users have their own userID which is used to
     * update their name, email and password of their account via Firebase
     */
    firebase.database().ref('users/' + userId).set({
      name: name,
      email: email,
      productType: product
    })
    /**
     * If there are any errors that have occured in the register account process,
     * one or more of these messages will appear in the field with the error
     */
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
/**
 * When logging in with the real-time database, it will take in the email and
 * password parameters to check with the database to ensure that the user is valid
 * and can proceed to login and access the learning module. If an error occurs,
 * the proper error message will appear in the application
 */
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
/**
 * This will send an email to the user to reset their password if they
 * have forgetten. Any errors that occur when trying to reset their email
 * will appear as a message on the application
 */
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
        console.log("---error.code", error.code);
        return {

          error: "Check your internet connection."
        };
    }
  }
};
