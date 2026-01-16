// worker.js - 主入口
import { VERSION, getTimestamp, generateId } from "./utils.js";

console.log("🚀 worker.js 开始执行");

export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    if (url.pathname === "/") {
      return new Response(`欢迎来到测试页面！

可用路径：
- /info 查看模块信息
- /source 查看代码结构
- /log 查看控制台日志

当前版本: ${VERSION}
`, {
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
    
    if (url.pathname === "/info") {
      const data = {
        test: "自动打包测试",
        version: VERSION,
        timestamp: getTimestamp(),
        id: generateId(),
        import: "模块导入成功",
        file: import.meta.url,
        testCase: "测试是否自动打包"
      };
      
      return new Response(JSON.stringify(data, null, 2), {
        headers: { "Content-Type": "application/json" }
      });
    }
    
    if (url.pathname === "/source") {
      const info = `
当前文件: ${import.meta.url}

测试目的：
检查 Cloudflare 是否自动打包模块

在 Cloudflare Workers 仪表板查看代码：
1. 如果有 __esm、__create 等函数，说明自动打包了
2. 如果有 worker_default 变量，说明自动打包了
3. 如果看到原始 import 语句，说明直接上传

访问 /log 查看控制台日志
      `;
      
      return new Response(info, {
        headers: { "Content-Type": "text/plain" }
      });
    }
    
    if (url.pathname === "/log") {
      return new Response("查看 Cloudflare Workers 仪表板的日志", {
        headers: { "Content-Type": "text/plain" }
      });
    }
    
    return new Response("Not Found\n可用路径: /, /info, /source, /log", { status: 404 });
  }
};
