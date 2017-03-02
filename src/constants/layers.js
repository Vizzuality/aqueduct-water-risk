const layers = [
  {
    id: '000001',
    name: 'Overall water risk',
    overall: true,
    children: [
      {
        id: '0003',
        name: 'Physical risk quantity',
        children: [
          {
            id: '0004',
            name: 'Baseline water stress',
            ponderation: []
          }
        ]
      },
      {
        id: '000005',
        name: 'Physical risk quantity',
        children: [
          {
            id: '0006',
            name: 'Baseline water stress',
            ponderation: []
          }
        ]
      },
      {
        id: '00007',
        name: 'Physical risk quantity',
        children: [
          {
            id: '0008',
            name: 'Baseline water stress',
            ponderation: []
          },
          {
            id: '0009',
            name: 'Baseline water stress',
            ponderation: []
          },
          {
            id: '0010',
            name: 'Baseline water stress',
            ponderation: []
          },
          {
            id: '0011',
            name: 'Baseline water stress',
            ponderation: []
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
    label: 'Business as usual',
    value: 'businessAsUsual'
  }
];

export { layers, futureLayers, scenarioOptions };
