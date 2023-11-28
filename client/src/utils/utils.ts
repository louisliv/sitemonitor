const getNumberFromString = (str: string, places: number | null = null): number => {
  var parsedNumber = Number(str.replace(/[^0-9\.]+/g,""))

  return places ? Number(parsedNumber.toFixed(places)) : parsedNumber
}

export { getNumberFromString }
