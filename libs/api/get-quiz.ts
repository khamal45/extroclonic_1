"use server";
export async function getQuiz(quizId: string) {
  const apiLink = `https://opentdb.com/api.php?amount=10&category=${quizId}&difficulty=easy&type=multiple`;
  const response = await fetch(apiLink);
  if (!response.ok) {
    throw new Error(`Failed to fetch quiz: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}
