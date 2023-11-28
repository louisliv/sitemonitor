const getNumberFromString = (str: string, places: number | null = null): number => {
  var parsedNumber = Number(str.replace(/[^0-9\.]+/g,""))

  return places ? Number(parsedNumber.toFixed(places)) : parsedNumber
}

const getBytesDisplay = (bytes: number): string => {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0B'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + '' + sizes[i]
} 

export { getNumberFromString, getBytesDisplay }
