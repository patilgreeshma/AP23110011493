const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJncmVlc2htYV9wYXRpbEBzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDI0MTEsImlhdCI6MTc3NzcwMTUxMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjQ5ZDE0MjY2LTBiYmMtNDZlNy04ODY3LTgxZWMyN2ZkMmZjNSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InBhdGlsIGdyZWVzaG1hIiwic3ViIjoiZTlhNGM0YzctZjI2ZS00ZWYzLTg4ZjAtODc5NmIxOWFhZDQ4In0sImVtYWlsIjoiZ3JlZXNobWFfcGF0aWxAc3JtYXAuZWR1LmluIiwibmFtZSI6InBhdGlsIGdyZWVzaG1hIiwicm9sbE5vIjoiYXAyMzExMDAxMTQ5MyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImU5YTRjNGM3LWYyNmUtNGVmMy04OGYwLTg3OTZiMTlhYWQ0OCIsImNsaWVudFNlY3JldCI6InVoZkRtUnNRa0RYVm5uTlAifQ.VrFkKO660dWCr4sC3SSDgtoi82WTy9zimTJOqXfIZzY";

const priority = {
  Placement: 3,
  Result: 2,
  Event: 1
};

async function run() {
  const res = await fetch(
    "http://20.207.122.201/evaluation-service/notifications",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await res.json();

  const notifications = Array.isArray(data)
    ? data
    : data.notifications || [];

  const sorted = notifications.sort((a, b) => {
    if (priority[b.Type] !== priority[a.Type]) {
      return priority[b.Type] - priority[a.Type];
    }

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  const top10 = sorted.slice(0, 10);

  console.log("Top 10 Notifications:\n");

  top10.forEach((n, i) => {
    console.log(
      `${i + 1}. ${n.Type} | ${n.Message} | ${n.Timestamp}`
    );
  });
}

run();