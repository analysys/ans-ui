/*
*
* 判断数据类型
*
*/

function isType (value) {
  const type = Object.prototype.toString.call(value)
  return type.match(/\[object (.*?)\]/)[1].toLowerCase()
}

export default isType
