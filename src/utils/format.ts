// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}
/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-vxxx-ipxxxxxxxxxx'.replace(/[x]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : c).toString(16)
  })
}