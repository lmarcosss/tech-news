import database from "@/infra/database.js";

async function status(_, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version");
 
  const [databaseVersionValue] = databaseVersionResult.rows;

  const databaseMaxConnections = await database.query("SHOW max_connections");
  const databaseMaxConnectionsValue = databaseMaxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB
  const databaseUsedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  });
  const databaseUsedConnectionsValue = databaseUsedConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue.server_version,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseUsedConnectionsValue,
      },
    },
  });
}

export default status;
