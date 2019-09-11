export const INDICATORS = [
  {
    id: 'w_awr_def_tot_cat',
    name: 'Overall Water Risk',
    overall: true,
    children: [
      {
        id: 'w_awr_def_qan_cat',
        name: 'Physical Risks Quantity',
        children: [
          {
            id: 'bws_cat',
            name: 'Water Stress',
            ponderation: true
          },
          {
            id: 'bwd_cat',
            name: 'Water Depletion',
            ponderation: true
          },
          {
            id: 'iav_cat',
            name: 'Interannual Variability',
            ponderation: true
          },
          {
            id: 'sev_cat',
            name: 'Seasonal Variability',
            ponderation: true
          },
          {
            id: 'gtd_cat',
            name: 'Groundwater Table Decline',
            ponderation: true
          },
          {
            id: 'rfr_cat',
            name: 'Riverine flood risk',
            ponderation: true
          },
          {
            id: 'cfr_cat',
            name: 'Coastal flood risk',
            ponderation: true
          },
          {
            id: 'drr_cat',
            name: 'Drought Risk',
            ponderation: true
          }
        ]
      },
      {
        id: 'w_awr_def_qal_cat',
        name: 'Physical Risks Quality',
        children: [
          {
            id: 'ucw_cat',
            name: 'Untreated Connected Wastewater',
            ponderation: true
          },
          {
            id: 'cep_cat',
            name: 'Coastal Eutrophication Potential',
            ponderation: true
          }
        ]
      },
      {
        id: 'w_awr_def_rrr_cat',
        name: 'Regulatory and Reputational Risk',
        children: [
          {
            id: 'udw_cat',
            name: 'Unimproved/No Drinking Water ',
            ponderation: true
          },
          {
            id: 'usa_cat',
            name: 'Unimproved/No Sanitation',
            ponderation: true
          },
          {
            id: 'rri_cat',
            name: 'Peak RepRisk Country ESG Risk Index',
            ponderation: true
          }
        ]
      }
    ]
  }
];

export const FUTURE_INDICATORS = {
  bs: [
    // projected change in water stress
    {
      id: '5aafeab1-4b48-40b0-9042-f654f1531aaf',
      name: 'Water Stress'
    },
    // projected change in seasonal variability
    {
      id: '45a1f9c5-7b0b-4705-978f-1e98dc8b3277',
      name: 'Seasonal Variability'
    },
    // projected change in water supply
    {
      id: 'c124cfce-0414-4cf3-ba2d-e63634199b04',
      name: 'Water Supply'
    },
    // projected change in water demand
    {
      id: 'a3795c06-d2eb-4aa3-8e24-62965b69e5ce',
      name: 'Water Demand'
    }
  ],
  absolute: [
    // projected water stress
    {
      id: 'd5c8316c-de80-4be3-a973-d3fbafc7eaca',
      name: 'Water Stress'
    },
    // projected seasonal variability
    {
      id: 'd7d5fd18-e8e4-4654-b595-7accbb582992',
      name: 'Seasonal Variability'
    },
    // projected water supply
    {
      id: 'a045b21a-c2ff-4ec5-b7fa-2c1f206b8911',
      name: 'Water Supply'
    },
    // projected water demand
    {
      id: 'cf7e6a51-3366-42d7-a8ae-ef0f1f11a5f1',
      name: 'Water Demand'
    }
  ]
};

export const SCENARIO_DESCRIPTIONS = {
  pessimistic: 'The "pessimistic" scenario (SSP3 RCP8.5) represents a fragmented world with uneven economic development and steadily rising global carbon emissions.',
  business_as_usual: 'The "business as usual" scenario (SSP2 RCP8.5) represents a world with stable economic development and steadily rising global carbon emissions.',
  optimistic: 'The "optimistic" scenario (SSP2 RCP4.5) represents a world with stable economic development and carbon emissions peaking and declining by 2040.'
};

// "equivalence" of future indicators through their projection
export const FUTURE_INDICATORS_SWAP = {
  bs: {
    'd5c8316c-de80-4be3-a973-d3fbafc7eaca': '5aafeab1-4b48-40b0-9042-f654f1531aaf',
    'd7d5fd18-e8e4-4654-b595-7accbb582992': '45a1f9c5-7b0b-4705-978f-1e98dc8b3277',
    'a045b21a-c2ff-4ec5-b7fa-2c1f206b8911': 'c124cfce-0414-4cf3-ba2d-e63634199b04',
    'cf7e6a51-3366-42d7-a8ae-ef0f1f11a5f1': 'a3795c06-d2eb-4aa3-8e24-62965b69e5ce'
  },
  absolute: {
    '5aafeab1-4b48-40b0-9042-f654f1531aaf': 'd5c8316c-de80-4be3-a973-d3fbafc7eaca',
    '45a1f9c5-7b0b-4705-978f-1e98dc8b3277': 'd7d5fd18-e8e4-4654-b595-7accbb582992',
    'c124cfce-0414-4cf3-ba2d-e63634199b04': 'a045b21a-c2ff-4ec5-b7fa-2c1f206b8911',
    'a3795c06-d2eb-4aa3-8e24-62965b69e5ce': 'cf7e6a51-3366-42d7-a8ae-ef0f1f11a5f1'
  }
};

export const INDICATOR_NAMES_RELATION = {
  w_awr_def_tot_cat: 'Overall Water Risk',
  w_awr_def_qan_cat: 'Physical Risks Quantity',
  w_awr_def_qal_cat: 'Physical Risks Quality',
  w_awr_def_rrr_cat: 'Regulatory and Reputational Risk',
  // Physical Risks Quantity
  bws_cat: 'Water Stress',
  bwd_cat: 'Water Depletion',
  gtd_cat: 'Groundwater Table Decline',
  iav_cat: 'Interannual Variability',
  sev_cat: 'Seasonal Variability',
  drr_cat: 'Drought Risk',
  rfr_cat: 'Riverine flood risk',
  cfr_cat: 'Coastal flood risk',
  // Water Quality Risk
  ucw_cat: 'Untreated Connected Wastewater',
  cep_cat: 'Coastal Eutrophication Potential',
  // Regulatory and Reputational
  udw_cat: 'Unimproved/No Drinking Water',
  usa_cat: 'Unimproved/No Sanitation',
  rri_cat: 'Peak RepRisk Country ESG Risk Index',
  // future
  '5aafeab1-4b48-40b0-9042-f654f1531aaf': 'Water Stress',
  '45a1f9c5-7b0b-4705-978f-1e98dc8b3277': 'Seasonal Variability',
  'c124cfce-0414-4cf3-ba2d-e63634199b04': 'Water Supply',
  'a3795c06-d2eb-4aa3-8e24-62965b69e5ce': 'Water Demand',
  'd5c8316c-de80-4be3-a973-d3fbafc7eaca': 'Water Stress',
  'd7d5fd18-e8e4-4654-b595-7accbb582992': 'Seasonal Variability',
  'a045b21a-c2ff-4ec5-b7fa-2c1f206b8911': 'Water Supply',
  'cf7e6a51-3366-42d7-a8ae-ef0f1f11a5f1': 'Water Demand'
};

export const INDICATOR_DESCRIPTIONS = {
  w_awr_def_tot_cat: {
    name: INDICATOR_NAMES_RELATION.w_awr_def_tot_cat,
    description: `Overall water risk measures all water-related risks, by aggregating all selected indicators
    from the Physical Quantity, Quality and Regulatory & Reputational Risk categories. Higher values
    indicate higher water risk.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  w_awr_def_qan_cat: {
    name: INDICATOR_NAMES_RELATION.w_awr_def_qan_cat,
    description: `Physical risks quantity measures risk related to too little or too much water,
    by aggregating all selected indicators from the Physical Risk Quantity category. Higher values indicate higher water quantity risks.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  w_awr_def_qal_cat: {
    name: INDICATOR_NAMES_RELATION.w_awr_def_qal_cat,
    description: `Physical risks quality measures risk related to water that is unfit for use,
    by aggregating all selected indicators from the Physical Risk Quality category. Higher values indicate higher water quality risks.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  w_awr_def_rrr_cat: {
    name: INDICATOR_NAMES_RELATION.w_awr_def_rrr_cat,
    description: `Regulatory and reputational risks measures risk related to uncertainty in regulatory change,
    as well as conflicts with the public regarding water issues. Higher values indicate higher regulatory and
    reputational water risks.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  // Water Quantity Risk
  bws_cat: {
    name: INDICATOR_NAMES_RELATION.bws_cat,
    description: `Baseline water stress measures the ratio of total water
    withdrawals to available renewable surface and groundwater supplies. Water withdrawals include domestic,
    industrial, irrigation, and livestock consumptive and
    nonconsumptive uses. Available renewable water supplies include the impact of upstream consumptive water
    users and large dams on downstream water availability.
    Higher values indicate more competition among
    users.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  bwd_cat: {
    name: INDICATOR_NAMES_RELATION.bwd_cat,
    description: `Baseline water depletion measures the ratio of total water
    consumption to available renewable water supplies.
    Total water consumption includes domestic, industrial,
    irrigation, and livestock consumptive uses. Available
    renewable water supplies include the impact of upstream
    consumptive water users and large dams on downstream
    water availability. Higher values indicate larger
    impact on the local water supply and decreased
    water availability for downstream users. Baseline water depletion is similar to baseline water
    stress; however, instead of looking at total water withdrawal (consumptive plus nonconsumptive), baseline
    water depletion is calculated using consumptive withdrawal only. `,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  gtd_cat: {
    name: INDICATOR_NAMES_RELATION.gtd_cat,
    description: `Groundwater table decline measures the average decline
    of the groundwater table as the average change for the
    period of study (1990–2014). The result is expressed in
    centimeters per year (cm/yr). Higher values indicate
    higher levels of unsustainable groundwater
    withdrawals.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  iav_cat: {
    name: INDICATOR_NAMES_RELATION.iav_cat,
    description: `Interannual variability measures the average betweenyear variability of available water supply, including both
    renewable surface and groundwater supplies. Higher values indicate wider variations in available supply from year to year. `,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  sev_cat: {
    name: INDICATOR_NAMES_RELATION.sev_cat,
    description: `Seasonal variability measures the average within-year
    variability of available water supply, including both
    renewable surface and groundwater supplies. Higher
    values indicate wider variations of available supply within a year.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  drr_cat: {
    name: INDICATOR_NAMES_RELATION.drr_cat,
    description: `Drought risk measures where droughts are likely to
    occur, the population and assets exposed, and the vulnerability of the population and assets to adverse effects.
    Higher values indicate higher risk of drought.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  rfr_cat: {
    name: INDICATOR_NAMES_RELATION.rfr_cat,
    description: `Riverine flood risk measures the percentage of population
    expected to be affected by Riverine flooding in an average
    year, accounting for existing flood-protection standards.
    Flood risk is assessed using hazard (inundation caused by
    river overflow), exposure (population in flood zone), and
    vulnerability.16 The existing level of flood protection is also
    incorporated into the risk calculation. It is important to
    note that this indicator represents flood risk not in terms
    of maximum possible impact but rather as average annual
    impact. The impacts from infrequent, extreme flood years
    are averaged with more common, less newsworthy flood
    years to produce the “expected annual affected population.” Higher values indicate that a greater proportion of the population is expected to be impacted
    by Riverine floods on average.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  cfr_cat: {
    name: INDICATOR_NAMES_RELATION.cfr_cat,
    description: `Coastal flood risk measures the percentage of the population expected to be affected by coastal flooding in an
    average year, accounting for existing flood protection
    standards. Flood risk is assessed using hazard (inundation caused by storm surge), exposure (population in
    flood zone), and vulnerability.17 The existing level of flood
    protection is also incorporated into the risk calculation.
    It is important to note that this indicator represents flood
    risk not in terms of maximum possible impact but rather
    as average annual impact. The impacts from infrequent,
    extreme flood years are averaged with more common, less
    newsworthy flood years to produce the “expected annual
    affected population.” Higher values indicate that a
    greater proportion of the population is expected
    to be impacted by coastal floods on average.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  // Water Quality Risk
  ucw_cat: {
    name: INDICATOR_NAMES_RELATION.ucw_cat,
    description: `Untreated connected wastewater measures the percentage of domestic wastewater that is connected through
    a sewerage system and not treated to at least a primary
    treatment level. Wastewater discharge without adequate
    treatment could expose water bodies, the general public,
    and ecosystems to pollutants such as pathogens and
    nutrients. The indicator compounds two crucial elements
    of wastewater management: connection and treatment.
    Low connection rates reflect households’ lack of access to
    public sewerage systems; the absence of at least primary
    treatment reflects a country’s lack of capacity (infrastructure, institutional knowledge) to treat wastewater.
    Together these factors can indicate the level of a country’s
    current capacity to manage its domestic wastewater
    through two main pathways: extremely low connection
    rates (below 1 percent), and high connection rates with
    little treatment. Higher values indicate higher percentages of point source wastewater discharged
    without treatment.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  cep_cat: {
    name: INDICATOR_NAMES_RELATION.cep_cat,
    description: `Coastal eutrophication potential (CEP) measures the
    potential for riverine loadings of nitrogen (N), phosphorus (P), and silica (Si) to stimulate harmful algal blooms
    in coastal waters. The CEP indicator is a useful metric
    to map where anthropogenic activities produce enough
    point-source and nonpoint-source pollution to potentially
    degrade the environment. When N and P are discharged
    in excess over Si with respect to diatoms, a major type
    of algae, undesirable algal species often develop. The
    stimulation of algae leading to large blooms may in turn
    result in eutrophication and hypoxia (excessive biological
    growth and decomposition that reduces oxygen available
    to other organisms). It is therefore possible to assess the
    potential for coastal eutrophication from a river’s N, P,
    and Si loading. Higher values indicate higher levels
    of excess nutrients with respect to silica, creating more favorable conditions for harmful algal
    growth and eutrophication in coastal waters
    downstream.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  // Regulatory and Reputational
  udw_cat: {
    name: INDICATOR_NAMES_RELATION.udw_cat,
    description: `Unimproved/no drinking water reflects the percentage of the population collecting drinking water from an
    unprotected dug well or spring, or directly from a river,
    dam, lake, pond, stream, canal, or irrigation canal (WHO
    and UNICEF 2017). Specifically, the indicator aligns with
    the unimproved and surface water categories of the Joint
    Monitoring Programme (JMP)—the lowest tiers of drinking water services. Higher values indicate areas
    where people have less access to safe drinking
    water supplies.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  usa_cat: {
    name: INDICATOR_NAMES_RELATION.usa_cat,
    description: `Unimproved/no sanitation reflects the percentage of the
    population using pit latrines without a slab or platform,
    hanging/bucket latrines, or directly disposing human
    waste in fields, forests, bushes, open bodies of water,
    beaches, other open spaces, or with solid waste (WHO
    and UNICEF 2017). Specifically, the indicator aligns with
    JMP’s unimproved and open defecation categories—
    the lowest tier of sanitation services. Higher values
    indicate areas where people have less access to
    improved sanitation services.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  rri_cat: {
    name: INDICATOR_NAMES_RELATION.rri_cat,
    description: `The Peak RepRisk country ESG risk index quantifies
    business conduct risk exposure related to environmental,
    social, and governance (ESG) issues in the corresponding
    country. The index provides insights into potential financial, reputational, and compliance risks, such as human
    rights violations and environmental destruction. RepRisk
    is a leading business intelligence provider that specializes
    in ESG and business conduct risk research for companies,
    projects, sectors, countries, ESG issues, NGOs, and more,
    by leveraging artificial intelligence and human analysis
    in 20 languages. WRI has elected to include the Peak
    RepRisk country ESG risk index in Aqueduct to reflect
    the broader regulatory and reputational risks that may
    threaten water quantity, quality, and access. While the
    underlying algorithm is proprietary, we believe that our
    inclusion of the Peak RepRisk country ESG risk index,
    normally unavailable to the public, is a value-add to the
    Aqueduct community. The peak value equals the highest level of the index in a given country over the last two
    years. The higher the value, the higher the risk
    exposure.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://www.wri.org/publication/aqueduct-30'
    }]
  },
  // future
  '5aafeab1-4b48-40b0-9042-f654f1531aaf': () => ({
    name: INDICATOR_NAMES_RELATION['5aafeab1-4b48-40b0-9042-f654f1531aaf'],
    description: `Water stress is an indicator of competition for water resources and is defined
      informally as the ratio of demand for water by human society divided by available water.`,
    sources: [{
      name: 'WRI Aqueduct 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  }),
  '45a1f9c5-7b0b-4705-978f-1e98dc8b3277': () => ({
    name: INDICATOR_NAMES_RELATION['45a1f9c5-7b0b-4705-978f-1e98dc8b3277'],
    description: `Seasonal variability (SV) is an indicator of the variability between months of the year.
      Increasing SV may indicate wetter wet months and drier dry months, and higher likelihood of droughts or wet periods.
      We used the within-year coefficient of variance between monthly total blue water as our indicator of seasonal variability of water supply.
      We calculated the coefficient of variance between months for each year, then estimated projected change in seasonal variability
      as the 21-year mean around the target year over the baseline period mean.`,
    sources: [{
      name: 'WRI Aqueduct 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  }),
  'c124cfce-0414-4cf3-ba2d-e63634199b04': () => ({
    name: INDICATOR_NAMES_RELATION['c124cfce-0414-4cf3-ba2d-e63634199b04'],
    description: `Total blue water (renewable surface water) was our indicator of water supply.
      Projected change in total blue water is equal to the 21-year mean around the target year divided by the baseline period of 1950–2010.`,
    sources: [{
      name: 'WRI Aqueduct 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  }),
  'a3795c06-d2eb-4aa3-8e24-62965b69e5ce': () => ({
    name: INDICATOR_NAMES_RELATION['a3795c06-d2eb-4aa3-8e24-62965b69e5ce'],
    description: `Water demand was measured as water withdrawals. Projected change in water withdrawals is equal to the summarized
    withdrawals for the target year, divided by the baseline year, 2010. Since irrigation consumptive use varies based on climate,
    we generated unique estimates of consumptive and non-consumptive agricultural withdrawal for each year.
    Estimates for consumptive and non-consumptive agricultural withdrawal for each ensemble member, scenario,
    and target year are the mean of the 21-year window around the target year.`,
    sources: [{
      name: 'WRI Aqueduct 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  }),
  'd5c8316c-de80-4be3-a973-d3fbafc7eaca': () => ({
    name: INDICATOR_NAMES_RELATION['d5c8316c-de80-4be3-a973-d3fbafc7eaca'],
    description: `Water stress is an indicator of competition for water resources and is defined informally
      as the ratio of demand for water by human society divided by available water.`,
    sources: [{
      name: 'WRI Aqueduct 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  }),
  'd7d5fd18-e8e4-4654-b595-7accbb582992': () => ({
    name: INDICATOR_NAMES_RELATION['d7d5fd18-e8e4-4654-b595-7accbb582992'],
    description: `Seasonal variability (SV) is an indicator of the variability between months of the year.
      Increasing SV may indicate wetter wet months and drier dry months, and higher likelihood of droughts or wet periods.
      We used the within-year coefficient of variance between monthly total blue water as our indicator of seasonal variability of water supply.
      We calculated the coefficient of variance between months for each year, then estimated projected change in seasonal variability
      as the 21-year mean around the target year over the baseline period mean.`,
    sources: [{
      name: 'WRI Aqueduct 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  }),
  'a045b21a-c2ff-4ec5-b7fa-2c1f206b8911': () => ({
    name: INDICATOR_NAMES_RELATION['a045b21a-c2ff-4ec5-b7fa-2c1f206b8911'],
    description: `Total blue water (renewable surface water) was our indicator of water supply.
      Projected change in total blue water is equal to the 21-year mean around the target year divided by the baseline period of 1950–2010.`,
    sources: [{
      name: 'WRI Aqueduct 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  }),
  'cf7e6a51-3366-42d7-a8ae-ef0f1f11a5f1': () => ({
    name: INDICATOR_NAMES_RELATION.rri_cat,
    description: `Water demand was measured as water withdrawals. Projected change in water withdrawals is equal to the summarized
    withdrawals for the target year, divided by the baseline year, 2010. Since irrigation consumptive use varies based on climate,
    we generated unique estimates of consumptive and non-consumptive agricultural withdrawal for each year.
    Estimates for consumptive and non-consumptive agricultural withdrawal for each ensemble member, scenario,
    and target year are the mean of the 21-year window around the target year.`,
    sources: [{
      name: 'WRI Aqueduct 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  })
};

// relates children layers with its parent in a straight way
export const PARENT_CHILDREN_LAYER_RELATION = {
  // Water Quantity Risk
  bws_cat: 'w_awr_def_qan_cat',
  bwd_cat: 'w_awr_def_qan_cat',
  gtd_cat: 'w_awr_def_qan_cat',
  iav_cat: 'w_awr_def_qan_cat',
  sev_cat: 'w_awr_def_qan_cat',
  drr_cat: 'w_awr_def_qan_cat',
  rfr_cat: 'w_awr_def_qan_cat',
  cfr_cat: 'w_awr_def_qan_cat',
  // Water Quality Risk
  ucw_cat: 'w_awr_def_qal_cat',
  cep_cat: 'w_awr_def_qal_cat',
  // Regulatory and Reputational
  udw_cat: 'w_awr_def_rrr_cat',
  usa_cat: 'w_awr_def_rrr_cat',
  rri_cat: 'w_awr_def_rrr_cat'
};

export const INDICATOR_COLUMNS = {
  // common columns for all indicators
  common: [
    { label: 'Name', value: 'location_name' },
    { label: 'Input address', value: 'input_address' },
    { label: 'Match address', value: 'match_address' },
    { label: 'Latitude', value: 'latitude' },
    { label: 'Longitude', value: 'longitude' },
    { label: 'Major Basin', value: 'major_basin_name' },
    { label: 'Minor Basin', value: 'minor_basin_name' },
    { label: 'Aquifer', value: 'aquifer_name' },
    { label: 'Country', value: 'name_0' },
    { label: 'Province', value: 'name_1' }
  ],
  // Overall Water Risk
  w_awr_def_tot_cat: [{ label: 'Overall Water Risk', value: 'w_awr_def_tot_label' }],
  // Water Quantity Risk
  w_awr_def_qan_cat: [
    { label: 'Physical Risks Quantity', value: 'w_awr_def_qan_label' },
    { label: 'Water Stress', value: 'bws_label' },
    { label: 'Groundwater Table Decline', value: 'gtd_label' },
    { label: 'Interannual Variability', value: 'iav_label' },
    { label: 'Seasonal Variability', value: 'sev_label' },
    { label: 'Drought Risk', value: 'drr_label' },
    { label: 'Riverine flood risk Stress', value: 'rfr_label' },
    { label: 'Coastal flood risk', value: 'cfr_label' }
  ],
  bws_cat: [{ label: 'Stress', value: 'bws_label' }],
  bwd_cat: [{ label: 'Depletion', value: 'bwd_label' }],
  iav_cat: [{ label: 'Interannual Variability', value: 'iav_label' }],
  gtd_cat: [{ label: 'Groundwater Table Decline', value: 'gtd_label' }],
  sev_cat: [{ label: 'Seasonal Variability', value: 'sev_label' }],
  drr_cat: [{ label: 'Drought Risk', value: 'drr_label' }],
  rfr_cat: [{ label: 'Riverine flood risk Stress', value: 'rfr_label' }],
  cfr_cat: [{ label: 'Coastal flood risk', value: 'cfr_label' }],
  // Water Quality Risk
  w_awr_def_qal_cat: [
    { label: 'Physical Risks Quality', value: 'w_awr_def_qal_label' },
    { label: 'Untreated Connected Water', value: 'ucw_label' },
    { label: 'Coastal Eutrophication Potential', value: 'cep_label' }
  ],
  ucw_cat: [{ label: 'Drought Risk', value: 'ucw_label' }],
  cep_cat: [{ label: 'Riverine flood risk Stress', value: 'cep_label' }],
  // Regulatory and Reputational
  w_awr_def_rrr_cat: [
    { label: 'Regulatory and Reputational Risk', value: 'w_awr_def_rrr_label' },
    { label: 'Unimproved/no drinking water', value: 'udw_label' },
    { label: 'Unimproved/no sanitation', value: 'usa_label' },
    { label: 'Peak RepRisk country ESG risk index', value: 'rri_label' }
  ],
  udw_cat: [{ label: 'Unimproved/no drinking water', value: 'udw_label' }],
  usa_cat: [{ label: 'Unimproved/no sanitation', value: 'usa_label' }],
  rri_cat: [{ label: 'Peak RepRisk country ESG risk index', value: 'rri_label' }],
  projected_change: [
    { label: 'Projected Change In {{indicator}} ({{projection}} To {{year}} {{scenario}} )', value: 'label' }
  ],
  // monthly exclusive
  monthly: {
    bws_cat: [{ label: 'Water Stress', value: 'bws_label' }],
    bwd_cat: [{ label: 'Water Depletion', value: 'bwd_label' }],
    iav_cat: [{ label: 'Interannual Variability', value: 'iav_label' }]
  },
  preset: {
    w_awr_def_tot_cat: [{ label: 'Overall Water Risk', value: 'w_awr_def_tot_label' }],
    w_awr_def_qan_cat: [{ label: 'Water Quantity Risk', value: 'w_awr_def_qan_label' }],
    w_awr_def_qal_cat: [{ label: 'Water Quality Risk', value: 'w_awr_def_qal_label' }],
    w_awr_def_rrr_cat: [{ label: 'Regulatory and Reputational', value: 'w_awr_def_rrr_label' }]
  }
};

export const INDICATOR_SCHEME_ORDER = [
  'bws_cat', 'bwd_cat', 'iav_cat', 'sev_cat',
  'gtd_cat', 'rfr_cat', 'cfr_cat', 'drr_cat',
  'ucw_cat', 'cep_cat', 'udw_cat', 'usa_cat', 'rri_cat'
];

export const EXCLUSIVE_MONTHLY_INDICATORS = ['bws_cat', 'bwd_cat', 'iav_cat'];

export const DEFAULT_FUTURE_INDICATOR = {
  bs: '5aafeab1-4b48-40b0-9042-f654f1531aaf',
  absolute: 'd5c8316c-de80-4be3-a973-d3fbafc7eaca'
};

export const DEFAULT_FUTURE_YEAR = '2030';

export const FUTURE_INDICATORS_IDS = [...FUTURE_INDICATORS.bs, ...FUTURE_INDICATORS.absolute].map(_indicator => _indicator.id);

export const ANALYZER_LOCATION_INDICATORS = [
  INDICATORS[0],
  ...INDICATORS[0].children,
  {
    name: 'Projected change',
    isFuture: true,
    // this id will change based on user's selection
    id: DEFAULT_FUTURE_INDICATOR.bs
  }
];

export const INDICATORS_MODAL_DEFINITION = {
  title: 'Relevance to Industry',
  description: `
  <ul>
    <li>No weight 0 Not relevant</li>
    <li>Very Low 0.25 Represents very low relevance to the industry</li>
    <li>Low 0.5 Represents low relevance to the industry</li>
    <li>Medium 1 Represents medium relevance to the industry</li>
    <li>High 2 Represents high relevance to the industry</li>
    <li>Very High 4 Represents very high relevance to the industry</li>
  </ul>`
};

export default {
  INDICATORS,
  FUTURE_INDICATORS,
  FUTURE_INDICATORS_SWAP,
  PARENT_CHILDREN_LAYER_RELATION,
  INDICATOR_COLUMNS,
  INDICATOR_NAMES_RELATION,
  INDICATOR_DESCRIPTIONS,
  INDICATOR_SCHEME_ORDER,
  EXCLUSIVE_MONTHLY_INDICATORS,
  DEFAULT_FUTURE_INDICATOR,
  DEFAULT_FUTURE_YEAR,
  FUTURE_INDICATORS_IDS,
  ANALYZER_LOCATION_INDICATORS,
  INDICATORS_MODAL_DEFINITION
};
