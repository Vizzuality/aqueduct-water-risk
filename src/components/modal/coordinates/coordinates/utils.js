export const convertDMSToDD = ({ degrees, minutes, seconds, cardinal }) => {
  const dd = +degrees + (+minutes / 60) + (+seconds / (60 * 60));
  return (cardinal === 's' || cardinal === 'w') ? dd * -1 : dd;
};

export default { convertDMSToDD };
