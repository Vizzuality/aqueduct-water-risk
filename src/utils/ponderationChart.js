const ponderationChart = {
  "name": "Vega Visualization",
  "height": 55,
  "width": 100,
  "padding": "auto",
  "marks": [
    {
      "properties": {
        "enter": {
          "startAngle": {"field": "layout_start"},
          "endAngle": {"field": "layout_end"},
          "innerRadius": {"value": 35},
          "outerRadius": {"value": 55},
          "x": {"mult": 0.5,"group": "width"},
          "y": {"mult": 0.5,"group": "height"},
          "fill": {"field": "x","scale": "color"},
          "stroke": {"value": "white"}
        }
      },
      "from": {
        "data": "table",
        "transform": [{"field": "y","type": "pie"}]
      },
      "type": "arc"
    }
  ],
  "scales": [
    {
      "name": "color",
      "range": ["#00a0e1","#2e57b8","#afc7ff"],
      "domain": {"data": "table", "field": "x_percent"},
      "type": "ordinal"
    }
  ],
  "legends": [{
    "fill": "color",
    "properties": {
       "legend": {
         "y": {"value": -25}
       },
       "labels": {
         "fontSize": {"value": 14},
         "fontWeight": {"value": "300"},
         "fill": {"value": "#758290"}
       },
       "symbols": {
         "size": {"value": 100},
         "shape": {"value": "square"},
         "stroke": {"value": "transparent"},
         "strokeWidth": {"value": 0}
       }
     }
  }]
};

export { ponderationChart };
