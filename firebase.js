// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"; // 🔥 FALTAVA ISSO

const firebaseConfig = {
  apiKey: "AIzaSyCRSVQ-M_r9RukOOZBWt5GZuoUQJFBHZ2A",
  authDomain: "controle-manutencao-cc96e.firebaseapp.com",
  projectId: "controle-manutencao-cc96e",
  storageBucket: "controle-manutencao-cc96e.firebasestorage.app",
  messagingSenderId: "453313302773",
  appId: "1:453313302773:web:64e384e412c1458adcf5bc"
};

const app = initializeApp(firebaseConfig);

// 🔥 EXPORTS
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);