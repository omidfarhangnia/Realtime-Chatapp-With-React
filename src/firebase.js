import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDL8h5p8as5oMM52A7_6H4UfsAsrDUsdUs",
  authDomain: "realtime-chatapp-41fbc.firebaseapp.com",
  projectId: "realtime-chatapp-41fbc",
  storageBucket: "realtime-chatapp-41fbc.appspot.com",
  messagingSenderId: "367958502014",
  appId: "1:367958502014:web:f9702c47c31139e39b062f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
