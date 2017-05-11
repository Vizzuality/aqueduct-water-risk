const layers = [
  {
    id: 'overall_water_risk',
    name: 'Overall Water Risk',
    overall: true,
    children: [
      {
        id: 'physical_risk_quantity',
        name: 'Physical Risk: QUANTITY',
        children: [
          {
            id: 'water_stress',
            name: 'Baseline water stress',
            ponderation: true
          },
          {
            id: 'interannual_variability',
            name: 'Interannual variability',
            ponderation: true
          },
          {
            id: 'seasonal_variability',
            name: 'Seasonal variability',
            ponderation: true
          },
          {
            id: 'flood_occurrence',
            name: 'Flood occurrence',
            ponderation: true
          },
          {
            id: 'drought_severity',
            name: 'Drought severity',
            ponderation: true
          },
          {
            id: 'groundwater_stress',
            name: 'Groundwater stress',
            ponderation: true
          },
          {
            id: 'upstream_storage',
            name: 'Upstream Storage',
            ponderation: true
          }
        ]
      },
      {
        id: 'physical_risk_quality',
        name: 'Physical Risk: QUALITY',
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
        name: 'Regulatory & Reputational Risk',
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
    id: 'water_stress',
    name: 'Water Stress'
  },
  {
    id: 'seasonal_variability',
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
