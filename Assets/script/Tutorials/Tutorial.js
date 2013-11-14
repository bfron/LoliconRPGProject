#pragma strict

var player : Transform;
var message : GUIText;

private var tutorialNumber : int;

function Start () {
	yield WaitForSeconds(0.2);
	tutorialNumber = 1;
	Message1();

}

function Update () {

	if(tutorialNumber == 1 && player.transform.position.x > -110)
	{
		Message2();
	}
	if(tutorialNumber == 2 && player.transform.position.x < -130)
	{
		Message3();
	}
	if(tutorialNumber == 3 && player.transform.position.x > -15)
	{
		Message4();
	}
	if(tutorialNumber == 4 && player.transform.position.x > 115)
	{
		Message5();
	}

}

function Message1()
{
	message.text = "지금부터 움직이는 방법에 대해서 알아봅니다.";
	player.SendMessage("PlayerStop", SendMessageOptions.DontRequireReceiver);
	yield WaitForSeconds(2);
	message.text = "앞으로 가는 방법은 플레이어의 앞을 터치하면 됩니다.";
	yield WaitForSeconds(2);
	message.text = "자, 그럼 앞으로 가보세요.";
	player.SendMessage("PlayerStop", SendMessageOptions.DontRequireReceiver);
}
function Message2()
{
	tutorialNumber = 2;
	message.text = "잘하셨습니다.";
	player.SendMessage("PlayerStop", SendMessageOptions.DontRequireReceiver);
	yield WaitForSeconds(2);
	message.text = "이번에는 뒤로 가는 방법을 알아보겠습니다.";
	yield WaitForSeconds(2);
	message.text = "뒤로 가는 방법은 플레이어의 뒤를 터치하면 됩니다.";
	yield WaitForSeconds(2);
	message.text = "자 그럼 뒤로 가보세요.";
	player.SendMessage("PlayerStop", SendMessageOptions.DontRequireReceiver);
}
function Message3()
{
	tutorialNumber = 3;
	message.text = "잘하셨습니다.";
	player.SendMessage("PlayerStop", SendMessageOptions.DontRequireReceiver);
	yield WaitForSeconds(2);
	message.text = "이제 진행을 위해 앞으로 이동하십시오.";
	yield WaitForSeconds(2);
	message.text = "";
	player.SendMessage("PlayerStop", SendMessageOptions.DontRequireReceiver);
}
function Message4()
{
	tutorialNumber = 4;
	message.text = "앞에 몬스터가 나타났습니다.";
	player.SendMessage("PlayerStop", SendMessageOptions.DontRequireReceiver);
	yield WaitForSeconds(2);
	message.text = "몬스터를 잡기 위해서는 해당 몬스터를 터치하면 됩니다.";
	yield WaitForSeconds(2);
	message.text = "앞에 있는 몬스터를 잡고 이동하십시오.";
	yield WaitForSeconds(2);
	message.text = "";
	player.SendMessage("PlayerStop", SendMessageOptions.DontRequireReceiver);
}
function Message5()
{
	tutorialNumber = 5;
	message.text = "앞에 포탈이 나타났습니다.";
	player.SendMessage("PlayerStop", SendMessageOptions.DontRequireReceiver);
	yield WaitForSeconds(2);
	message.text = "포탈로 들어가면 다음 스테이지로 이동합니다.";
	yield WaitForSeconds(2);
	message.text = "";
	player.SendMessage("PlayerStop", SendMessageOptions.DontRequireReceiver);
}