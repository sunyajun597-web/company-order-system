import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function resolvePath(url) {
  const clean = decodeURIComponent(url.split("?")[0]);
  const target = clean === "/" ? "/index.html" : clean;
  const file = normalize(join(root, target));
  return file.startsWith(root) ? file : join(root, "index.html");
}

createServer(async (req, res) => {
  try {
    let file = resolvePath(req.url || "/");
    try {
      const info = await stat(file);
      if (info.isDirectory()) file = join(file, "index.html");
    } catch {
      file = join(root, "index.html");
    }
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(String(error));
  }
}).listen(port, () => {
  console.log(`业务订单系统预览地址：http://localhost:${port}`);
});
