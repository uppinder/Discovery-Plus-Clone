export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }

    const jsonSerializedState = JSON.parse(serializedState);

    return jsonSerializedState;
  } catch (error) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (error) {
    // Ignore write errors.
  }
};
