#pragma strict

var messageText : GUIText;
var MessageBox : Transform;
var characterName : Transform;
var characterMessage : Transform;
var mawang : Transform;

var ma_message1 : Texture;
var ma_message2 : Texture;

private var ani_playing : boolean;
private var ani_num : int;
private var tempTextString : String;


function Start () {
	ani_playing = false;
	ani_num = 1;
	Show1();
	
	BonusMessage.bonusOk = false;
}

function Update () {

	if(Input.GetButton("attack"))
	{
		ani_num = 6;
		print("스킵");
	}
	else if(Input.GetButton("Touch") && ani_playing == false)
		Show1();
		
}

function Show1() {
	
	var i : int;
	switch(ani_num)
	{
		case 1	:	ani_playing = true;
					tempTextString = "옛날 어떤 마을에 사이좋은 자매가 있었다.\n\n사실 이 자매는 과거 세계를 구한 영웅의 후손으로써\n\n이른 나이에 부모님을 잃었지만\n\n봄의 새싹마냥 기죽지 않고 열심히 살았다.";
					for(i=1;i<=tempTextString.Length;i++)
					{
						messageText.text = tempTextString.Substring(0, i);
						yield WaitForSeconds(0.02);
					}
					//animation.Play("MessageFade");
					ani_num++;
					ani_playing = false;
					break;
		
		case 2	:	ani_playing = true;
					tempTextString = "그러던 어느 날,\n\n조상들이 봉인했던 마왕이\n\n긴 잠에서 깨어나 복수를 하러 찾아왔다.\n\n하지만 이미 영웅은 죽은지 오래였고,\n\n남아있는 영웅의 후손인 자매들은 너무나도 약했다.";
					for(i=1;i<=tempTextString.Length;i++)
					{
						messageText.text = tempTextString.Substring(0, i);
						yield WaitForSeconds(0.02);
					}
					ani_num++;
					ani_playing = false;
					break;
	
		case 3	:	ani_playing = true;
					tempTextString = "마왕은 허무했다.\n\n자매들을 죽여봐야\n\n자신의 복수에 하등 의미가 없을 것 같았다.\n\n\n\n그래서 그는 자매들 중 언니를 데려가기로 했다.";
					for(i=1;i<=tempTextString.Length;i++)
					{
						messageText.text = tempTextString.Substring(0, i);
						yield WaitForSeconds(0.02);
					}
					ani_num++;
					ani_playing = false;
					break;
		
		case 4	:	ani_playing = true;
					messageText.text = "";
					//MessageBox_In.transform.renderer.material.mainTexture = ma_message1;
					characterName.GetComponent(TextMesh).text = "마왕";
					characterMessage.GetComponent(TextMesh).text = "나를 봉인했던 녀석의 후손이 이렇게 약하다니\n이렇게 허무할 수가 없군요.";
					mawang.animation.Play("MawangOpen");
					yield WaitForSeconds(0.5);
					MessageBox.animation.Play("MessageBoxOpen");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break;
		
		case 5 	:	ani_playing = true;
					characterMessage.animation.Play("characterMessage_close");
					yield WaitForSeconds(0.5);
//					MessageBox_In.transform.renderer.material.mainTexture = ma_message2;
					//MessageBox.animation.Play("MessageBoxOpen");\
					characterMessage.GetComponent(TextMesh).text = "대신 당신이라도 데려가서\n내 허드렛일을 시켜야겠군요.";
					characterMessage.animation.Play("characterMessage_open");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break;
		
		case 6	:	ani_playing = true;
					MessageBox.animation.Play("MessageBoxClose");
					mawang.animation.Play("MawangClose");
					yield WaitForSeconds(0.5);
					tempTextString = "언니를 마왕에게 빼앗긴 동생은\n\n어머니의 유품을 입고 마왕성으로 향하기 시작했다.";
					for(i=1;i<=tempTextString.Length;i++)
					{
						messageText.text = tempTextString.Substring(0, i);
						yield WaitForSeconds(0.02);
					}
					ani_num++;
					ani_playing = false;
					break;
		
		case 7	:	//animation.Play("MessageFadeIn");
					messageText.text = "";
					Application.LoadLevel("stage01");
					break;
	}


/*
	animation.Play("MessageFade");
	yield WaitForSeconds(2);
	animation.Stop();
	yield WaitForSeconds(2);
	animation.Play("MessageFadeIn");
	yield WaitForSeconds(2);
	transform.renderer.material.mainTexture = message2;
	animation.Play("MessageFade");
	yield WaitForSeconds(2);
	animation.Stop();
	yield WaitForSeconds(2);
	animation.Play("MessageFadeIn");
	yield WaitForSeconds(2);
	Show2(); */
}
function Show2() {
//	MessageBox_In.transform.renderer.material.mainTexture = ma_message1;
	MessageBox.animation.Play("MessageBoxOpen");
	mawang.localScale.x = 7;
	yield WaitForSeconds(2);
	MessageBox.animation.Play("MessageBoxClose");
	yield WaitForSeconds(0.5);
//	MessageBox_In.transform.renderer.material.mainTexture = ma_message2;
	MessageBox.animation.Play("MessageBoxOpen");
	yield WaitForSeconds(2);
	MessageBox.animation.Play("MessageBoxClose");
	mawang.localScale.x = 0;
	yield WaitForSeconds(0.5);
		
//	transform.renderer.material.mainTexture = message3;
	animation.Play("MessageFade");
	yield WaitForSeconds(2);
	animation.Stop();
	animation.Play("MessageFadeIn");
	yield WaitForSeconds(2);
	
	Application.LoadLevel("stage01");
}