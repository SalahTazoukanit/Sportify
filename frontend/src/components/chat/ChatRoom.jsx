// // Importations Firebase modulaire
// import axios from "axios";
// import { initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   orderBy,
//   limit,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { useCollectionData } from "react-firebase-hooks/firestore";

// // Configuration Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyABBALR6hwB9NTh656gcm1IiR4UMHerXk4",
//   authDomain: "sportify-5c05e.firebaseapp.com",
//   projectId: "sportify-5c05e",
//   storageBucket: "sportify-5c05e.appspot.com",
//   messagingSenderId: "921517423062",
//   appId: "1:921517423062:web:ef1dd573b2cc89966d4c77",
//   measurementId: "G-SN57H428QZ",
// };

// // Initialisation Firebase
// const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);

// const ChatRoom = () => {
//   const token = localStorage.getItem("token");
//   const [user, setUser] = useState();
//   const [event, setEvent] = useState(null); // Initialisation de `event` à `null`
//   const [newMessage, setNewMessage] = useState("");

//   const headers = {
//     Authorization: "Bearer " + token,
//   };

//   // Fonction pour récupérer les informations de l'utilisateur
//   const getUserInfos = () => {
//     axios
//       .post("http://127.0.0.1:8000/api/v1/users/show", {}, { headers })
//       .then((response) => {
//         console.log(response);
//         setUser(response.data.user);
//       });
//   };

//   // Fonction pour récupérer les événements (modifié pour récupérer le premier événement seulement)
//   const getEvents = () => {
//     axios.get("http://127.0.0.1:8000/api/v1/events/").then((response) => {
//       if (response.data.event.length > 0) {
//         setEvent(response.data.event[0]); // Utilise seulement le premier événement pour cet exemple
//       }
//     });
//   };

//   useEffect(() => {
//     getUserInfos();
//     getEvents();
//   }, []);

//   // Attendre que `event` soit défini avant de créer la requête Firestore
//   const messagesRef = collection(firestore, "chat_participants");

//   let messagesQuery;
//   if (event) {
//     // Crée la requête seulement si `event` est défini
//     messagesQuery = query(
//       messagesRef,
//       where("to", "==", event.id), // Filtrer par l'ID de l'événement
//       orderBy("createdAt"),
//       limit(25)
//     );
//   }

//   // Utilisation du hook pour récupérer les messages en temps réel
//   const [messages] = useCollectionData(messagesQuery || null, {
//     idField: "id",
//   });

//   // Fonction pour envoyer un message
//   const sendMessage = async (e) => {
//     e.preventDefault();

//     if (user && event) {
//       await addDoc(messagesRef, {
//         text: newMessage,
//         createdAt: serverTimestamp(),
//         from: user.id, // ID de l'utilisateur qui envoie le message
//         to: event.id, // ID de l'événement (lié à ce chat)
//         eventName: event.name,
//         // userName: user.name, // Nom de l'utilisateur
//       });

//       // Réinitialiser le champ de texte
//       setNewMessage("");
//     }
//   };

//   return (
//     <div>
//       {/* Affichage des messages */}
//       <div>
//         {messages &&
//           messages.map((msg) => (
//             <div key={msg.id}>
//               <strong>{msg.userName}</strong>: {msg.text}
//             </div>
//           ))}
//       </div>

//       {/* Formulaire pour envoyer un message */}
//       <form onSubmit={sendMessage}>
//         <input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Écrire un message"
//         />
//         <button type="submit" disabled={!newMessage || !event}>
//           {" "}
//           {/* Désactiver le bouton si `event` n'est pas encore chargé */}
//           Envoyer
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatRoom;
