export function mergeDataWithKey(data) {
  if (!data) {
    return [];
  }
  return Object.values(data).map((value, index) => {
    return {
      ...value,
      key: Object.keys(data)[index],
    };
  });
}

export function getBoardKey() {
  return window.location.href.split("/").pop();
}

export function byPropKey(propertyName, value) {
  return {
    [propertyName]: value,
  };
}

export function getBadgeColor(tag) {
  if (tag === "Low") {
    return "rgb(0, 137, 209)";
  } else if (tag === "Medium") {
    return "rgb(146, 39, 143)";
  } else if (tag === "High") {
    return "rgb(59, 167, 68)";
  }
}
