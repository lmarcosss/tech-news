test("GET to /api/v1/status returns 200", async () => {
  const response = await fetch(`${process.env.API_URL}/api/v1/status`);

  expect(response.status).toBe(200);
});
