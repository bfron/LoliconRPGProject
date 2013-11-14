#pragma strict

function Start () {
	if(Application.loadedLevelName != "stage06_expansion" && Application.loadedLevelName != "deathStage" && Application.loadedLevelName != "stage_Talk")
		DontDestroyOnLoad(transform.gameObject);
	else
		Destroy(transform.gameObject);
}

function Update () {

}