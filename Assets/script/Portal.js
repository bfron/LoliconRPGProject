#pragma strict

var fadePanel : Transform;

function Start () {
}

function OnTriggerEnter(target : Collider)
{
	if(target.name == "주인공")
	{
		target.transform.SendMessage("PlayerStop", SendMessageOptions.DontRequireReceiver);
		NextStage();
	}
}
function NextStage()
{
	fadePanel.animation.Play("fadeout");
	yield WaitForSeconds(2);
	if(Application.loadedLevelName == "stage01")
	{
		HP.hero_hp = 100;
		Application.LoadLevel("stage02");
	}
	else if(Application.loadedLevelName == "stage02")
		Application.LoadLevel("stage03");
	else if(Application.loadedLevelName == "stage03")
		Application.LoadLevel("stage04");
	else if(Application.loadedLevelName == "stage04")
		Application.LoadLevel("stage05");
	else if(Application.loadedLevelName == "stage05")
		Application.LoadLevel("stage06");
	else if(Application.loadedLevelName == "stage06")
		Application.LoadLevel("stage_Talk");
	
}