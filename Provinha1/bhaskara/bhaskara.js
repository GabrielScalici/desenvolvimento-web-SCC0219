function calculateRoots() {
	a = parseFloat(document.getElementById("a-input").value);
	b = parseFloat(document.getElementById("b-input").value);
	c = parseFloat(document.getElementById("c-input").value);

	if (a === 0 || isNaN(a) || isNaN(b) || isNaN(c)) {
		alert("Invalid input! 'a' != 0 and all input must be numeric");
		x1 = "?";
		x2 = "?";
	} else {
		delta = (b*b)-(4*a*c);

		if (delta < 0) {
			x1 = "?";
			x2 = "?";
		}else{
			x1 = (-b + Math.sqrt(a))/ 2*a;
			x2 = (-b - Math.sqrt(a))/ 2*a;
		}
	}

	x1_out = document.getElementById("x1-result");
	x2_out = document.getElementById("x2-result");

	x1_out.innerText = x1;
	x2_out.innerText = x2;
}
