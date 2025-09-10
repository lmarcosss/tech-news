
test("GET to /api/v1/status returns 200", async () => {
  const response = await fetch(`${process.env.API_URL}/api/v1/status`);
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedValue = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBe(parsedValue);

  const databaseInfo = responseBody.dependencies.database;

  expect(databaseInfo.version).toEqual("16.0");
  expect(databaseInfo.max_connections).toEqual(100);
  expect(databaseInfo.open_connections).toEqual(1);
});

// test("SQL Injection test", async () => {
//   await fetch(`${process.env.API_URL}/api/v1/status?databaseName=';SELECT pg_sleep(4); --`);
// });
