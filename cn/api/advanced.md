# 高级 API

本章节介绍项目的高级 API。

## API 2

### 功能描述

这是一个高级 API 示例。

### 参数

- `options`：配置选项对象
  - `option1`：选项 1 描述
  - `option2`：选项 2 描述

### 返回值

返回一个 Promise，解析为操作结果。

### 示例

```javascript
async function example() {
  const result = await api2({ option1: 'value1', option2: 'value2' });
  console.log(result);
}
```