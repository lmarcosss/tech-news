import database from "@/infra/database";
import { RunnerOption, runner as migrationRunner } from "node-pg-migrate";
import { resolve } from "node:path";

enum METHODS {
  GET = "GET",
  POST = "POST",
}

const ALLOWED_METHODS = [METHODS.GET, METHODS.POST];

export default async function migrations(request, response) {
  if (!ALLOWED_METHODS.includes(request.method)) {
    return response
      .status(405)
      .json({ error: `Method ${request.method} not allowed` });
  }

  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const defaultMigrationOptions: RunnerOption = {
      dbClient,
      dryRun: true,
      dir: resolve(process.cwd(), "infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === METHODS.POST) {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }

      return response.status(200).json(migratedMigrations);
    }

    if (request.method === METHODS.GET) {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);

      response.status(200).json(pendingMigrations);
    }
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
