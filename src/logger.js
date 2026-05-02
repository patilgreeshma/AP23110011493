import { token } from "./config";
export async function Log(level, pkg, message) {
  try {
    await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        stack: "frontend",
        level,
        package: pkg,
        message
      })
    });
  } catch (e) {
    console.log("log failed");
  }
}