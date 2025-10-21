// my-app/utils/firestore.js

import { db } from '../lib/firebase'; // Import the db instance
import { collection, getDocs } from 'firebase/firestore'; 

/**
 * Fetches all documents from a specified collection.
 * @param {string} collectionName - The ID of the Firestore collection (e.g., 'products').
 * @returns {Array} - An array of documents with their IDs.
 */
export async function getCollection(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));

    const data = [];
    querySnapshot.forEach((doc) => {
      // Map the document data and include the unique ID
      data.push({ 
        id: doc.id, 
        ...doc.data() 
      });
    });

    return data;
  } catch (error) {
    console.error("Error fetching collection:", error);
    return [];
  }
}