export const TimeFormatter = (value: string) => {
  const time = value.split('T')[0] + ' ' + value.split('T')[1].split('Z')[0]
  return time
}
