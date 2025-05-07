"use server";

import { getProfile } from "@libs/firebase/service/database";
import ClientPage from "./client-page";
import { getCookie } from "@libs/cookies/use-cookie";

export default async function Home() {
  const username = await getCookie("uid").then(async (uid) =>
    uid ? await getProfile(uid) : "username not found"
  );

  const getCategory = await fetch("https://opentdb.com/api_category.php");
  const categoryData = await getCategory.json();

  return (
    <ClientPage
      category={categoryData.trivia_categories}
      username={username.username}
    />
  );
}
