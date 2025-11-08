# Copilot Instructions for vue3_ts_cms

## 项目架构概览

- 本项目基于 Vue 3 + TypeScript，使用 Vite 作为构建工具。
- 主要入口文件：`src/main.ts`，根组件为 `src/App.vue`。
- 页面和组件结构位于 `src/components/`，图标组件在 `src/components/icons/`。
- 样式文件集中在 `src/assets/`，如 `base.css` 和 `main.css`。
- 公共资源放在 `public/` 目录。

## 关键开发流程

- 安装依赖：`npm install` 或 `pnpm install`
- 启动开发服务器：`npm run dev`
- 生产构建：`npm run build`
- 代码检查：`npm run lint`（ESLint 配置见 `eslint.config.ts`）
- 类型检查推荐使用 `vue-tsc`，确保 `.vue` 文件类型安全。

## 约定与模式

- 组件命名采用 PascalCase，文件名与导出组件一致。
- 样式优先使用局部 `<style scoped>`，全局样式放在 `src/assets/`。
- TypeScript 类型定义扩展在 `env.d.ts`。
- 配置文件如 `vite.config.ts`、`tsconfig*.json` 位于项目根目录。
- Prettier 代码风格见 `.prettierrc.json`，如：无分号、单引号、最大宽度 100。

## 集成与依赖

- 推荐使用 VS Code + Volar 插件进行开发，禁用 Vetur。
- 浏览器建议安装 Vue.js Devtools 并启用 Custom Object Formatter。
- 依赖管理采用 `pnpm`，锁定文件为 `pnpm-lock.yaml`。

## 重要文件参考

- `src/App.vue`：根组件结构与全局逻辑
- `src/main.ts`：应用入口与挂载流程
- `src/components/`：业务组件与复用模式
- `vite.config.ts`：构建与开发服务器配置
- `tsconfig*.json`：TypeScript 配置与类型约束

## 示例：添加新组件

1. 在 `src/components/` 下新建 `MyComponent.vue`，采用 PascalCase 命名。
2. 在 `App.vue` 或其他父组件中引入并注册。
3. 按需在 `src/assets/` 添加样式。

---

如需补充特殊约定或遇到不明确的结构，请在此文档下方补充说明。
