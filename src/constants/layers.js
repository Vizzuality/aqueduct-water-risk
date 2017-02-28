const layers = [
  {
    id: '000001',
    name: 'Overall water risk',
    children: [
      {
        id: '0002',
        name: 'Children 1'
      },
      {
        id: '0003',
        name: 'Children 3'
      },
      {
        id: '000004',
        name: 'Layer 3'
      },
      {
        id: '000005',
        name: 'Layer 4',
        children: [
          {
            id: '0006',
            name: 'Layer 5',
            children: [
              {
                id: '00007',
                name: 'Layer 5'
              }
            ]
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
