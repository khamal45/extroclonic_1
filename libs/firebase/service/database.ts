"use server";
import { get, getDatabase, ref, remove, set } from "firebase/database";
import firebase_app from "../config";
import { deleteCookie } from "@libs/cookies/use-cookie";
const database = getDatabase(firebase_app);
export const getLeaderboard = async () => {
  try {
    const databaseRef = ref(database, "leaderboard");
    const snapshot = await get(databaseRef);
    const leaderboardData = snapshot.val();

    if (leaderboardData) {
      const dataArray = Object.keys(leaderboardData).map((key) => ({
        id: key,
        ...leaderboardData[key],
      }));

      dataArray.sort((a, b) => b.score - a.score);

      return dataArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
export const getScore = async (uid: string) => {
  try {
    const databaseRef = ref(database, "leaderboard/" + uid);
    const snapshot = await get(databaseRef);
    const leaderboardData = snapshot.val();

    return leaderboardData;
  } catch (error) {
    return null;
  }
};
export const setLeaderboard = async (
  uid: string,
  username: string,
  score: string
) => {
  try {
    const addData = async () => {
      const dataRef = ref(database, "leaderboard/" + uid);
      await set(dataRef, {
        username: username,
        score: score,
      });
    };
    const oldScore = await getScore(uid);
    if (oldScore != null) {
      if (Number(oldScore.score) > Number(score)) {
        return null;
      } else {
        addData();
      }
    } else {
      addData();
    }
  } catch (error) {
    console.error("Error menambahkan data:", error);
    throw error;
  }
};

export const setProfile = async (uid: string, username: string) => {
  try {
    const dataRef = ref(database, "profile/" + uid);
    await set(dataRef, {
      username: username,
    });
  } catch (error) {
    console.error("Error menambahkan data:", error);
    throw error;
  }
};
export const checkProfile = async (uid: string) => {
  try {
    const databaseRef = ref(database, `profile/${uid}`);
    const snapshot = await get(databaseRef);
    return snapshot.exists();
  } catch (error) {
    console.error("Error checking uid:", error);
    throw error;
  }
};
export const getProfile = async (uid: string) => {
  try {
    const databaseRef = ref(database, `profile/${uid}`);
    const snapshot = await get(databaseRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting profile:", error);
    throw error;
  }
};
export const deleteLeaderboard = async (uid: string) => {
  try {
    const leaderboardRef = ref(database, `leaderboard/${uid}`);
    await remove(leaderboardRef);
  } catch (error) {
    console.error("Error deleting leaderboard entry:", error);
    throw error;
  }
};

export const deleteProfile = async (uid: string) => {
  try {
    await deleteLeaderboard(uid);
    const profileRef = ref(database, `profile/${uid}`);
    await deleteCookie("uid");
    await remove(profileRef);
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw error;
  }
};
