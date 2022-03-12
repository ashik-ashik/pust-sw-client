import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "../firebase.config/firebase.config";
const firebaseInit = () => {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}
export default firebaseInit;