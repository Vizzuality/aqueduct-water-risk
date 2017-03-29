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
            name: 'Baseline water stress',
            ponderation: true
          },
          {
            id: 'interannual_variability',
            name: 'Interannual Variability',
            ponderation: true
          },
          {
            id: 'seasonal_variability',
            name: 'Seasonal Variability',
            ponderation: true
          },
          {
            id: 'flood_occurrence',
            name: 'Flood Occurrence',
            ponderation: true
          },
          {
            id: 'drought_severity',
            name: 'Drought Severity',
            ponderation: true
          },
          {
            id: 'upstream_storage',
            name: 'Upstream Storage',
            ponderation: true
          },
          {
            id: 'groundwater_stress',
            name: 'Groundwater Stress',
            ponderation: true
          }
        ]
      },
      {
        id: 'physical_risk_quality',
        name: 'Physical risk quality',
        children: [
          {
            id: 'return_flow_ratio',
            name: 'Return Flow Ratio',
            ponderation: true
          },
          {
            id: 'upstream_protected_land',
            name: 'Upstream Protected Land',
            ponderation: true
          }
        ]
      },
      {
        id: 'regulatory_and_reputational_risk',
        name: 'Regulatory and reputational risk',
        children: [
          {
            id: 'media_coverage',
            name: 'Media Coverage',
            ponderation: true
          },
          {
            id: 'access_to_water',
            name: 'Access to Water',
            ponderation: true
          },
          {
            id: 'threatened_amphibians',
            name: 'Threatened Amphibians',
            ponderation: true
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
