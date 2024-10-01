#pragma strict
var m:Matrix4x4;

function Start () {
	//m = this.camera.projectionMatrix; 
}

function Update () {
	//this.transform.localToWorldMatrix);
	this.GetComponent.<Camera>().projectionMatrix = m;
}
