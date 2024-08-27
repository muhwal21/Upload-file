// script.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyZzxvk3mmvGgDh3tj2vxAgILKpHWZdqQ",
  authDomain: "newuploafiledio.firebaseapp.com",
  projectId: "newuploafiledio",
  storageBucket: "newuploafiledio.appspot.com",
  messagingSenderId: "1060814640926",
  appId: "1:1060814640926:web:439e6ff597639988b49b0f",
  measurementId: "G-200SLXTT9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// Function to handle file upload
window.uploadFile = function () {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const loadingDiv = document.getElementById('loading');
  const notificationDiv = document.getElementById('notification');
  const fileURLDiv = document.getElementById('fileURL');

  if (file) {
    // Show loading animation
    loadingDiv.style.display = 'block';
    notificationDiv.style.display = 'none';
    fileURLDiv.innerHTML = '';

    const storageRef = ref(storage, 'files/' + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a file!', snapshot);

      // Get the download URL and display it
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        loadingDiv.style.display = 'none'; // Hide loading animation

        fileURLDiv.innerHTML = `<a href="${downloadURL}" target="_blank">Download File</a>`;

        // Show success notification
        notificationDiv.innerHTML = 'File uploaded successfully!';
        notificationDiv.style.display = 'block';
      }).catch((error) => {
        console.error('Error getting download URL:', error);
        loadingDiv.style.display = 'none'; // Hide loading animation

        // Show error notification
        notificationDiv.innerHTML = 'Error getting download URL.';
        notificationDiv.style.display = 'block';
      });
    }).catch((error) => {
      console.error('Error uploading file:', error);
      loadingDiv.style.display = 'none'; // Hide loading animation

      // Show error notification
      notificationDiv.innerHTML = 'Error uploading file.';
      notificationDiv.style.display = 'block';
    });
  } else {
    console.error('No file selected');
  }
};

