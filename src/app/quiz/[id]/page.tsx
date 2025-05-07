"use server";

import { getQuiz } from "@libs/api/get-quiz";
import ClientPage from "./client-page";

export default async function Quiz({ params }: { params: { id: string } }) {
  const response = await getQuiz(params.id);
  return <ClientPage quiz={response.results} id={params.id} />;
}
