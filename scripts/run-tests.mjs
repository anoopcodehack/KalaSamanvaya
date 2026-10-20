import { spawn, execSync } from "node:child_process";
import net from "node:net";

async function getAvailablePort(startPort = 3100) {
  for (let port = startPort; port < startPort + 50; port++) {
    const isAvailable = await new Promise((resolve) => {
      const server = net.createServer();
      server.once("error", () => resolve(false));
      server.once("listening", () => {
        server.close(() => resolve(true));
      });
      server.listen(port, "127.0.0.1");
    });
    if (isAvailable) return port;
  }
  return 3000;
}

async function run() {
  const PORT = await getAvailablePort(3200);
  const TEST_URL = `http://127.0.0.1:${PORT}`;

  console.log(`Starting Next.js production server on dynamic free port ${PORT}...`);

  const serverProcess = spawn("npx.cmd", ["next", "start", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
    env: { ...process.env, PORT: String(PORT) },
  });

  serverProcess.stdout.on("data", (d) => {
    const line = d.toString();
    if (line.includes("Ready") || line.includes("started server")) {
      console.log(`[Next.js Server] ${line.trim()}`);
    }
  });

  serverProcess.stderr.on("data", (d) => {
    const err = d.toString();
    if (!err.includes("ExperimentalWarning")) {
      process.stderr.write(`[Server Error] ${err}`);
    }
  });

  async function waitForServer(timeoutMs = 30000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      try {
        const res = await fetch(`${TEST_URL}/api/products`);
        if (res.status === 200) {
          return true;
        }
      } catch (_) {}
      await new Promise((r) => setTimeout(r, 600));
    }
    throw new Error(`Server failed to start within ${timeoutMs}ms on port ${PORT}`);
  }

  function cleanup(exitCode) {
    console.log("Shutting down test server...");
    try {
      if (process.platform === "win32") {
        spawn("taskkill", ["/pid", serverProcess.pid, "/f", "/t"]);
      } else {
        serverProcess.kill("SIGTERM");
      }
    } catch (_) {}
    setTimeout(() => process.exit(exitCode), 600);
  }

  try {
    await waitForServer();
    console.log(`Server is ready at ${TEST_URL}. Running test suite...\n`);

    const testProcess = spawn("node", ["scripts/e2e-test-suite.mjs"], {
      stdio: "inherit",
      env: { ...process.env, TEST_URL },
    });

    testProcess.on("close", (code) => {
      cleanup(code);
    });
  } catch (err) {
    console.error("Test execution failed:", err);
    cleanup(1);
  }
}

run();
