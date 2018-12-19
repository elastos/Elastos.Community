export const getIndex = function (object = {}, index = '') {
	// this will get a value from object
	// ex: data.obj.obj.obj.string => (data, 'obj/obj/obj/string)

	try {
		let temResult = object
	  let indexes = index.split('/')

	  if (!index || !object) {
	  	throw new Error('wrong arguments')
	  }

	  for (let i of indexes) {
	  	temResult = temResult[i]
	  }
	  return temResult
  } catch (e) {
  	console.log(e)
  	return ''
  }
}
