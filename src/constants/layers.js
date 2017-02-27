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
      }
    ]
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
];

export { layers };
