const layers = [
  {
    id: 'overall_water_risk',
    name: 'Overall water risk',
    overall: true,
    children: [
      {
        id: 'physical_risk_quantity',
        name: 'Physical risk quantity',
        children: [
          {
            id: 'water_stress',
            name: 'Baseline water stress'
          },
          {
            id: 'interannual_variability',
            name: 'Interannual Variability'
          },
          {
            id: 'seasonal_variability',
            name: 'Seasonal Variability'
          },
          {
            id: 'flood_occurrence',
            name: 'Flood Occurrence'
          },
          {
            id: 'drought_severity',
            name: 'Drought Severity'
          },
          {
            id: 'upstream_storage',
            name: 'Upstream Storage'
          },
          {
            id: 'groundwater_stress',
            name: 'Groundwater Stress'
          }
        ]
      },
      {
        id: 'physical_risk_quality',
        name: 'Physical risk quality',
        children: [
          {
            id: 'return_flow_ratio',
            name: 'Return Flow Ratio'
          },
          {
            id: 'upstream_protected_land',
            name: 'Upstream Protected Land'
          }
        ]
      },
      {
        id: 'regulatory_and_reputational_risk',
        name: 'Regulatory and reputational risk',
        children: [
          {
            id: 'media_coverage',
            name: 'Media Coverage'
          },
          {
            id: 'access_to_water',
            name: 'Access to Water'
          },
          {
            id: 'threatened_amphibians',
            name: 'Threatened Amphibians'
          }
        ]
      }
    ]
  }
];

const futureLayers = [
  {
    id: '11111',
    name: 'Water Stress'
  },
  {
    id: '22222',
    name: 'Seasonal variability'
  },
  {
    id: '33333',
    name: 'Water supply'
  },
  {
    id: '4444',
    name: 'Water demand'
  }
];

const scenarioOptions = [
  {
    label: 'Optimistic',
    value: 'optimistic'
  },
  {
    label: 'Pesimistic',
    value: 'pesimistic'
  },
  {
    label: 'Business as usual',
    value: 'businessAsUsual'
  }
];

export { layers, futureLayers, scenarioOptions };
