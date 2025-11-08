# MCP Server Chart Option

<p>
  <a href="README.md">English</a> |
  <a href="README-zh.md">中文</a>
</p>

An MCP server that dynamically generates chart configuration options for various chart libraries based on input data.

## Features

- Dynamically generates chart configurations for multiple chart types
- Provides a unified interface format for seamless integration with different front-end chart libraries

## Supported Chart Libraries

- ECharts

## API Methods

1. create_pie_chart_option
2. create_line_chart_option
3. create_column_chart_option

## Integration

Register this service in your MCP client to start using it.

## Example

**Input Example:**

```json
{
  "name": "create_pie_chart_option",
  "arguments": {
    "data": [
      { "name": "Category A", "value": 17 },
      { "name": "Category B", "value": 55 }
    ]
  }
}
```

**Output Example (ECharts option):**

```json
{
  "series": [
    {
      "type": "pie",
      "data": [
        { "name": "Category A", "value": 17 },
        { "name": "Category B", "value": 55 }
      ]
    }
  ]
}
```

## Reference

[mcp-server-chart](https://github.com/antvis/mcp-server-chart)
