// utils.js - 被导入的模块
console.log("🔧 utils.js 被加载了");

export const VERSION = "1.0.0-test";

export function getTimestamp() {
  return new Date().toISOString();
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
