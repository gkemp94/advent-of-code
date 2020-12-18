export const flatten = (array: any, result: any = []): any => {
  if (array.length === 0) {
    return result
  }
  var head = array[0]
  var rest = array.slice(1)
  if (Array.isArray(head)) {
    return flatten(head.concat(rest), result)
  }
  result.push(head)
  return flatten(rest, result)
}
