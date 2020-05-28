
export const changeCount = (operate) => {
  if (operate === 'add') {
    return {
      type: "ADD"
    }
  }
  return {
    type: "MINUS"
  }
}