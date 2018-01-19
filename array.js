const array = ["1", "2", "3", "4", "5", 35, 135]

function numSorter(array) {
	return array.map(elem => elem*elem)
}
console.log(numSorter(array))

function findNum(array) {
	for (elem of array) {
		if (elem % 7 == 0 && elem % 5 == 0) {
			return elem;
		}
	}
	return null;
}
console.log(findNum(array))

function keepLarge(array) {
	return array.filter(function(item) { 
	    return item > 100
	})
}
console.log(keepLarge(array))

function removeNum(array, int) {
	let returnVal = []
	array.forEach(function(elem) {
		if (elem !== int) {
			returnVal.push(elem)
		}
	})
	return returnVal
}
console.log(removeNum(array, 135))