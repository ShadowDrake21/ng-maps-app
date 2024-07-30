export const saveToLocalStorage = (name: string, data: any): void => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const retrieveFromLocalStorage = (name: string): unknown => {
  const strItemFromLS = localStorage.getItem(name);

  if (strItemFromLS) {
    return JSON.parse(strItemFromLS);
  } else {
    return null;
  }
};

export const removeFromLocalStorage = (name: string): void => {
  localStorage.removeItem(name);
};