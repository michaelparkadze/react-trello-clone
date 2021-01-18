import { auth } from "./firebase";

export const getUser = () => auth.currentUser;

// function getCurrentUser(auth) {
//     return new Promise((resolve, reject) => {
//        const unsubscribe = auth.onAuthStateChanged(user => {
//           unsubscribe();
//           resolve(user);
//        }, reject);
//     });
//   }
