import { INDICATOR_SCHEME_ORDER } from 'constants/indicators';
import { PRESET_VALUES } from 'constants/presets';

export const getPresetBreakdown = (source = {}) => {
  const quantityTotal = (+source.bws_cat || 0) + (+source.bwd_cat || 0) + (+source.gtd_cat || 0) +
    (+source.iav_cat || 0) + (+source.sev_cat || 0) + (+source.drr_cat || 0) + (+source.rfr_cat || 0) + (+source.cfr_cat || 0);
  const qualityTotal = (+source.ucw_cat || 0) + (+source.cep_cat || 0);
  const regulatoryTotal = (+source.udw_cat || 0) + (+source.usa_cat || 0) + (+source.rri_cat || 0);
  const total = quantityTotal + qualityTotal + regulatoryTotal;
  return ({
    quantity: (quantityTotal / total) * 100,
    quality: (qualityTotal / total) * 100,
    regulatory: (regulatoryTotal / total) * 100
  });
};

export const parseWeights = (ponderation) => {
  const { scheme, custom } = ponderation;
  const source = scheme === 'custom' ? custom : PRESET_VALUES[scheme];

  return INDICATOR_SCHEME_ORDER.map(weightOrder => source[weightOrder]);
};

export default {
  getPresetBreakdown,
  parseWeights
};
