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
            id: 'water_supply_trend',
            name: 'Water supply trend',
            ponderation: true,
            optional: true,
            disabled: true
          },
          {
            id: 'water_demand_trend',
            name: 'Water demand trend',
            ponderation: true,
            optional: true,
            disabled: true
          },
          {
            id: 'groundwater_table_decline',
            name: 'Groundwater table decline',
            ponderation: true,
            optional: true,
            disabled: true
          }
        ]
      },
      {
        id: 'physical_risk_quality',
        name: 'Physical Risk: QUALITY',
        children: [
          {
            id: 'wastewater_treatment',
            name: '% Wastewater treatment',
            ponderation: true,
            disabled: true
          },
          {
            id: 'icep',
            name: 'ICEP (Index of Coastal Eutrophication Potential)',
            ponderation: true,
            disabled: true
          }
        ]
      },
      {
        id: 'regulatory_and_reputational_risk',
        name: 'Regulatory & Reputational Risk',
        children: [
          {
            id: 'peak_reprisk_index',
            name: 'Peak RepRisk Index',
            ponderation: true,
            disabled: true
          },
          {
            id: 'access_to_water',
            name: 'Access to Water',
            ponderation: true
          },
          {
            id: 'iucn_red_list_of_threatened_freshwater_species',
            name: 'IUCN Red List of Threatened Freshwater Species',
            ponderation: true,
            disabled: true
          },
          {
            id: 'access_to_sanitation_facilities',
            name: 'Access to Sanitation Facilities',
            ponderation: true,
            disabled: true,
            optional: true
          },
          {
            id: 'transboundary_political_tension',
            name: 'Transboundary political tension',
            ponderation: true,
            disabled: true,
            optional: true
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
