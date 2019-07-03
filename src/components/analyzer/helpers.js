import moment from 'moment';
import { version } from '../../../package.json';

export const getFileName = () => {
  const now = moment();
  const aqueductMajorVersion = version.split('.')[0];
  const date = now.format('YYYYMMDD');
  const UTCTime = now.format('HHmm');

  return `aqueduct_v${aqueductMajorVersion}_${date}_${UTCTime}`;
};

export default { getFileName };
