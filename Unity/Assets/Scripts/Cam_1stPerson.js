#pragma strict
var attachTo:Transform = null;


function Update () {
	if (attachTo) {
		this.transform.position = attachTo.transform.position;
		this.transform.rotation = attachTo.transform.rotation;
	}
}