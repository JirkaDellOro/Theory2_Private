#pragma strict
var cams:Camera[];
private var activeCam:Camera = null;

@script ExecuteInEditMode()

function Start() {
	//cams = this.FindObjectsOfType(Camera);
}
function OnGUI() {
	var menuRect:Rect = new Rect(Screen.width-160,0,160,600);
	GUI.BeginGroup(menuRect);
	var y:int = 0;
	for (var cam:Camera in cams) {
//	for (var o:Object in cams) {
//		var cam = o as Camera;
		if (GUI.Toggle(new Rect(0,y,menuRect.width, 20), (cam == activeCam), cam.name)) {
			if (activeCam) activeCam.enabled = false;
			activeCam = cam;
			cam.enabled = true;
		}
		
		y += 30;
	}
	GUI.EndGroup();
	GUI.Label(Rect(10,Screen.height-20,360,40), "© Prof. Jirka R. Dell'Oro-Friedl, HFU 2014");
}