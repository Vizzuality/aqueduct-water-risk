import { createSelector } from 'reselect';

// Get point list and selected point list from state
const points = state => state.analyzeLocations.points.list;
const selected = state => state.analyzeLocations.points.selected;

// Create a function to compare the current active datatasets and the current datasetsIds
function getCategorizedPoints(_points, _selected) {
  const categorizedPoints = _points.map((point) => {
    return {
      ...point,
      options: {
        selected: _selected.includes(point.id)
      }
    };
  });

  return categorizedPoints;
}

// Export the selector
export default createSelector(
  points,
  selected,
  getCategorizedPoints
);
