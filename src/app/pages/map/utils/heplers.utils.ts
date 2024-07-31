export const getCorrectOsmType = (value: 'node' | 'way' | 'relation') => {
  if (value === 'node') {
    return 'N';
  } else if (value === 'way') {
    return 'W';
  } else {
    return 'R';
  }
};
