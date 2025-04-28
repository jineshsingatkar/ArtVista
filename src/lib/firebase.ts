import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDLiKj0Z1ff7Zs9srXjBPgQzaiQHXzyglo",
  authDomain: "artvista-2568d.firebaseapp.com",
  projectId: "artvista-2568d",
  storageBucket: "artvista-2568d.firebasestorage.app",
  messagingSenderId: "915357281497",
  appId: "1:915357281497:web:7b6a2b993cd2ee649c22c8",
  measurementId: "G-D7W09V05ET"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; 