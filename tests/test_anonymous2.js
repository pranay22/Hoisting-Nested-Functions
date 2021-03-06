

/* 
* Test case for the anonymous functions.
* Our Analysis says that function c cannot be hoisted.
*/

var x = function (a, b) {

	var r = 3;
	var c = function(){
		return 4 + r;
	}
	c();

	return a * b;
};

var z = x(4, 3);
