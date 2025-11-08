# MCP Server Chart Option

<p>
  <a href="README.md">English</a> |
  <a href="README-zh.md">中文</a>
</p>

用于根据输入数据，动态生成适用于各类图表组件库的动态图表配置的 MCP 服务。

## 主要特性

- 动态生成图表配置，支持多种图表类型
- 提供统一的接口格式，方便与不同前端图表库集成

## 支持的图表组件库

- ECharts

## 接口说明

1. create_pie_chart_option
2. create_line_chart_option
3. create_column_chart_option

## 集成使用

在 MCP 客户端中注册该服务，即可开始使用。

## 示例

**输入示例：**

```json
{
  "name": "create_pie_chart_option",
  "arguments": {
    "data": [
      { "name": "分类一", "value": 17 },
      { "name": "分类二", "value": 55 }
    ]
  }
}
```

**输出示例（ECharts option）：**

```json
{
  "series": [
    {
      "type": "pie",
      "data": [
        { "name": "分类一", "value": 17 },
        { "name": "分类二", "value": 55 }
      ]
    }
  ]
}
```

## 参考

[mcp-server-chart](https://github.com/antvis/mcp-server-chart)
