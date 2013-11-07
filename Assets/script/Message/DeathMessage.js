#pragma strict
var characterName : Transform;
var characterMessage : Transform;

private var ani_playing : boolean;
private var ani_num : int;

function Start () {
	ani_playing = false;
	ani_num = 1;
	Show();
}

function Update () {

	if(Input.GetButton("Touch") && ani_playing == false)
		Show();

}
function Show() {

	switch(ani_num)
	{
		case 1	:	yield WaitForSeconds(1);
					characterName.GetComponent(TextMesh).text = "동생";
					characterMessage.GetComponent(TextMesh).text = "...여기까지인가.";
					animation.Play("MessageBoxOpen");
					ani_num++;
					ani_playing = false;
					break;
		
		case 2 : 	animation.Play("MessageBoxClose");
					yield WaitForSeconds(2);
					Application.LoadLevel("stage00");
					break;
	}
	
}