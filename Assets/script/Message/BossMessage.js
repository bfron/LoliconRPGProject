#pragma strict

var MessageBox : Transform;
//var MessageBox_In : Transform;

var mawang : Transform;
var unni : Transform;
var dongsang : Transform;

var characterName : Transform;
var characterMessage : Transform;

private var ma_size : int = 7;
private var unni_size : int = 6;
private var dong_size : int = 7;
private var tempTextString : String;
/*
var ma_msg1 : Texture;
var ma_msg2 : Texture;
var ma_msg3 : Texture;
var ma_msg4 : Texture;

var un_msg1 : Texture;
var un_msg2 : Texture;
var un_msg3 : Texture;
var un_msg4 : Texture;

var dong_msg1 : Texture;
var dong_msg2 : Texture;
var dong_msg3 : Texture;
var dong_msg4 : Texture;
var dong_msg5 : Texture;
var dong_msg6 : Texture;
*/
private var ani_playing : boolean;
private var ani_num : int;

function Start () {
	ani_playing = false;
	ani_num = 1;
	Show1();
}

function Update () {

	if(Input.GetButton("Touch") && ani_playing == false)
		Show1();

}
function Show1() {
	var i : int;
	switch(ani_num)
	{
		case 1	:	ani_playing = true;
					yield WaitForSeconds(1);
					characterName.GetComponent(TextMesh).text = "마왕";
					characterMessage.GetComponent(TextMesh).text = "용케 이 성까지 찾아오셨군요.";
					mawang.animation.Play("MawangOpen");
					animation.Play("MessageBoxOpen");
					ani_num++;
					ani_playing = false;
					break; // 마왕 : 용케 이 성 까지 찾아오셨군요
					
		case 2	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					characterName.animation.Play("characterName_close");
					yield WaitForSeconds(0.5);
					dongsang.animation.Play("DongsangOpen");
					characterName.GetComponent(TextMesh).text = "동생";
					characterMessage.GetComponent(TextMesh).text = "마왕!";
					characterMessage.animation.Play("characterMessage_open");
					characterName.animation.Play("characterName_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; // 동생 : 마왕!
					
		case 3	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					characterName.animation.Play("characterName_close");
					yield WaitForSeconds(0.5);
					characterName.GetComponent(TextMesh).text = "마왕";
					characterMessage.GetComponent(TextMesh).text = "언니를 되찾기 위해서 오셨다면\n아쉽지만 돌아가셔야 겠군요.";
					characterMessage.animation.Play("characterMessage_open");
					characterName.animation.Play("characterName_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; // 마왕 : 언니를 되찾기 위해서 오셨다면 안됐지만 돌아가셔야 겠네요.
					
		case 4	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					yield WaitForSeconds(0.5);
					characterMessage.GetComponent(TextMesh).text = "왜냐면 그녀는 저와 결혼을 했기 때문이죠.";
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; // 마왕 : 그녀는 저와 혼인을 하였습니다.
					
		case 5 	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					characterName.animation.Play("characterName_close");
					yield WaitForSeconds(0.5);
					characterName.GetComponent(TextMesh).text = "동생";
					characterMessage.GetComponent(TextMesh).text = "아니, 나의 목적은 그게 아니야.\n난... 너를 보러 왔어. 내 목적은 너야!";
					characterName.animation.Play("characterName_open");
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; // 동생 : 아니 나의 목적은 그게 아니야. 난 너를 보러 왔어. 내 목적은 너야.
					
		case 6 	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					characterName.animation.Play("characterName_close");
					yield WaitForSeconds(0.5);
					characterName.GetComponent(TextMesh).text = "마왕";
					characterMessage.GetComponent(TextMesh).text = "?!";
					characterName.animation.Play("characterName_open");
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; // 마왕 : ?!
					
		case 7 	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					characterName.animation.Play("characterName_close");
					yield WaitForSeconds(0.5);
					characterName.GetComponent(TextMesh).text = "동생";
					characterMessage.GetComponent(TextMesh).text = "나를 가져 마왕.";
					characterName.animation.Play("characterName_open");
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; // 동생 : 나를 가져 마왕
					
		case 8	:	ani_playing = true;
					mawang.animation.Play("MawangClose");
					yield WaitForSeconds(0.5);
					characterMessage.animation.Play("characterMessage_close");
					characterName.animation.Play("characterName_close");
					yield WaitForSeconds(0.5);
					unni.animation.Play("UnniOpen");
					yield WaitForSeconds(0.5);
					characterName.GetComponent(TextMesh).text = "언니";
					characterMessage.GetComponent(TextMesh).text = "오랫만이구나 동생아.\n방금 한 말... 내가 잘못 들은건 아니겠지?";
					characterName.animation.Play("characterName_open");
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; // 언니 : 오랫만이구나 동생아. 방금 들은 말은 잘못이 아니겠지?
					
		case 9 	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					characterName.animation.Play("characterName_close");
					yield WaitForSeconds(0.5);
					characterName.GetComponent(TextMesh).text = "동생";
					characterMessage.GetComponent(TextMesh).text = "언니.\n오랫만에 보는데 이런 말 하기는 미안하지만";
					characterName.animation.Play("characterName_open");
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; // 동생 : 언니. 오랫만에 봐서 이런말 하기는 미안하지만
					
		case 10	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					yield WaitForSeconds(0.5);
					characterMessage.GetComponent(TextMesh).text = "난 사실 처음 마왕을 봤을 때 부터\n그가 너무 마음에 들었어.";
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; // 동생 : 난 사실 처음 마왕을 봤을 때 부터 그가 마음에 들었어.
					
		case 11	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					yield WaitForSeconds(0.5);
					characterMessage.GetComponent(TextMesh).text = "그래서 결심했어. 그를 내 남자로 만들기로.\n그러니까 내 앞에서 사라져줄래?";
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; 
					
		case 12	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					characterName.animation.Play("characterName_close");
					yield WaitForSeconds(0.5);
					characterName.GetComponent(TextMesh).text = "언니";
					characterMessage.GetComponent(TextMesh).text = "뭐?\n니가 감히 내 남자를 탐내다니!";
					characterName.animation.Play("characterName_open");
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; // 언니 : 안보는 사이에 많이 컸구나.
					
		case 13	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					yield WaitForSeconds(0.5);
					characterMessage.GetComponent(TextMesh).text = "안보는 사이에 많이 컸구나.\n더 이상 말로 하는건 의미 없을 것 같아.";
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; 
		
		case 14	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					yield WaitForSeconds(0.5);
					characterMessage.GetComponent(TextMesh).text = "어릴 때 종종 너와 나 둘 중에\n누가 더 강할까 생각했었지.";
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; // 언니 : 어릴 때 종종 너와 나 둘 중에 누가 더 강할까 생각했었지.
					
		case 15	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					yield WaitForSeconds(0.5);
					characterMessage.GetComponent(TextMesh).text = "이번에 그 결과를 보자꾸나.";
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break; // 언니의 마지막 메시지
					
		case 16	:	ani_playing = true;
					animation.Play("MessageBoxClose");
					mawang.localScale.x = 0;
					unni.localScale.x = 0;
					dongsang.localScale.x =0;
					
					yield WaitForSeconds(1);
					Application.LoadLevel("stage04");
					break;
	}
}