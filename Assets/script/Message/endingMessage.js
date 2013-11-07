#pragma strict

var dongsang : Transform;
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

function Show() 
{	

	switch(ani_num)
	{
		case 1	:	ani_playing = true;
					yield WaitForSeconds(1);
					dongsang.animation.Play("DongsangOpen");
					yield WaitForSeconds(0.5);
					characterName.GetComponent(TextMesh).text = "동생";
					characterMessage.GetComponent(TextMesh).text = "언니.\n그러니까 좋은말로 할 때 양보했어야지.";
					animation.Play("MessageBoxOpen");
					ani_num++;
					ani_playing = false;
					break;
		
		case 2	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					yield WaitForSeconds(0.5);
					characterMessage.GetComponent(TextMesh).text = "안타깝지만\n마왕의 옆자리는 내가 다신 가져갈께.";
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break;
					
		case 3	:	ani_playing = true;
					animation.Play("MessageBoxClose");
					yield WaitForSeconds(0.5);
					dongsang.animation.Play("DongsangClose");
					yield WaitForSeconds(2);
					Application.LoadLevel("stage00");
					break;
	}
}