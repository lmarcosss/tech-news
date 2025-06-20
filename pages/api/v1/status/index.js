import database from "@/infra/database.js";

async function status(_, response) {
  const result = await database.query("SELECT 1 + 1 as SUM;");

  console.log(result.rows);

  response.status(200).json({
    message: "Alunos do curso.dev sao pessoas acima da média!",
  });
}

export default status;
