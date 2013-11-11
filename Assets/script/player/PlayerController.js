#pragma strict

var maincamera : Transform;
var game_manager : Transform; // 게임 매니저
private var camera_position : float = 10;
private var cameraback : boolean; // 카메라가 뒤를 봐야 하는가?

private var player : Animator;
private var playerState : String;

private var screenType : float; // 현재 구동되고 있는 화면비

static var moveforce : int; // 캐릭터가 움직여야 하는가!
static var jumpforce : boolean;

static var frontSight : boolean = true; // 캐릭터는 앞을 보는가?
private var amtRot : float; // 플레이어가 돌아서는 각도

private var hitInfo : RaycastHit; // 충돌체 정보
private var range : int = 8; // 충돌 감지 거리

private var controller : CharacterController; // 캐릭터 컨트롤러[중력판별용]

static var playerMotion : String; // 플레이어의 현재 모션(Check_motion 함수와 연동)
static var monsterAttack : boolean; // 몬스터를 공격하는지 여부

private var touched : boolean;
private var touchedNumber : int;

static var player_die : boolean;

function Start () {

	player = transform.GetComponent(Animator);
	playerMotion = "";
	touched = false;
	touchedNumber = 0;
	monsterAttack = false;
	screenType = (Screen.height * 1.0) / (Screen.width * 1.0);
	controller = GetComponent(CharacterController);
	player_die = false;

}
function Check_Motion()
{
	if(player.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.idle0"))
		playerMotion = "idle";
	else if(player.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.attack0"))
		playerMotion = "attack0";
	else if(player.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.attack1"))
		playerMotion = "attack1";
	else if(player.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.skill2"))
		playerMotion = "skill2";
	else if(player.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.death"))
		playerMotion = "death";
	else if(player.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.wound"))
		playerMotion = "wound";
	else if(player.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.run"))
		playerMotion = "run";
	else if(player.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.dodge"))
		playerMotion = "dodge";
	
}
function Update () {
	check_position (); // 카메라 포지션 설정
	
	if(!player.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.idle0")) // 캐릭터 동작 상태가 idle 상태가 아닐 경우 모든 상태 초기화.
	{
		player.SetBool("idleToAttack1", false);
		player.SetBool("idleToAttack0", false);
		player.SetBool("idleToWound", false);
		player.SetBool("idleToSkill2", false);
		player.SetBool("idleToDodge", false);
		player.SetBool("idleToRun", false);
	}
	
	cameraback = false;
	
	if(Input.GetButton("Touch")) // 터치가 입력 된 경우 터치 처리 함수 실행.
		Get_touch();
	else if(!Input.GetButton("Touch") && touched == true)	// 커맨드 입력 취소
	{
		if(touchedNumber == 5) // 터치를 뗏는데 마지막에 누른 버튼이 5번 버튼일 경우.
			player.SetBool("idleToDodge", true);
			
		touched = false; // 터치 입력 초기화
		touchedNumber = 0;
		transform.SendMessage("CommandStackClear", SendMessageOptions.DontRequireReceiver); // 커맨드 입력 초기화.
	}
	
	if(moveforce == 0 && player.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.run")) // 플레이어가 움직이지 않을 때는 멈추는 애니메이션 재생
		player.SetBool("runToIdle", true);
	else
		player.SetBool("runToIdle", false);
		
	if(!cameraback) // 카메라가 뒤를 보다가 다시 앞으로 봐야 할 때
	{ 
		if(camera_position < 10) // 카메라 위치를 되돌린다.
			camera_position += 0.5;
			
		if(frontSight == false && controller.isGrounded) // 캐릭터를 돌린다.
			turn();
	}
}
function Get_touch()
{
	if(touched == false)
	{
		if(target_click()) 
			return 0;
	}
	
	//if(CheckMotion.motion == MOTION.attack) return 0;
	
	game_manager.SendMessage("Touch_button", null);
		
	switch(Button.click_number){ // 화면을 9개의 좌표로 나누어서 각각의 좌표에 해당하는 기능을 실행시킨다.
		case 1 : Screen_1(); break;
		case 2 : Screen_2(); break;
		case 3 : Screen_3(); break;
		case 4 : Screen_4(); break;
		case 5 : Screen_5(); break;
		case 6 : Screen_6(); break;
		case 7 : Screen_7(); break;
		case 8 : Screen_8(); break;
		case 9 : Screen_9(); break;
	}
}
function Screen_1()
{
	if(touched == true && touchedNumber != 1) // 다른 버튼을 누르고 있는 상태에서 드래그 되어 1번 버튼으로 왔을 경우.
	{
		touchedNumber = 0; // 초기화.(Wound 작동에 영향을 끼치므로)
		transform.SendMessage("Command", 1); // 커맨드 작동
	}
	else // 해당 버튼을 처음 터치 했을 경우
	{
		touched = true; // 터치했다.
		touchedNumber = 1; // 1번 버튼을.
	}
}
function Screen_2()
{
	if(touched == true && touchedNumber != 2)
	{
		touchedNumber = 0;
		transform.SendMessage("Command", 2);
	}
	else
	{
		touched = true;
		touchedNumber = 2;
		
		HP.hero_hp -= 10; // 테스트용
	}
}
function Screen_3()
{
	if(touched == true && touchedNumber != 3)
	{
		touchedNumber = 0;
		transform.SendMessage("Command", 3);
	}
	else
	{
		touched = true;
		touchedNumber = 3;
	}
}
function Screen_4()
{
	if(touched == true && touchedNumber != 4)
	{
		touchedNumber = 0;
		transform.SendMessage("Command", 4);
	}
	else
	{
		touched = true;
		touchedNumber = 4;
	
		if(frontSight == true) // 캐릭터가 앞을 보고 있다면 돌리자
			turn();
			
		moveforce = 1;
		player.SetBool("idleToRun", true); // 달리는 애니메이션을 재생하라!
		
		if(camera_position > -10) 
			camera_position -= 0.5;
			
			
		
		
		cameraback = true;
	}
}
function Screen_5()
{
	if(touched == true && touchedNumber != 5)
	{
		touchedNumber = 0;
		transform.SendMessage("Command", 5);
	}
	else
	{
		touched = true;
		touchedNumber = 5;
		
		//player.SetBool("idleToWound", true);
	}
}
function Screen_6()
{
	if(touched == true && touchedNumber != 6)
	{
		touchedNumber = 0;
		transform.SendMessage("Command", 6);
	}
	else
	{
		touched = true;
		touchedNumber = 6;
		
		if(frontSight == false)
			turn();
			
		moveforce = 1;
		player.SetBool("idleToRun", true); // 달리는 애니메이션을 재생하라!
	}
	
}
function Screen_7()
{
	if(touched == true && touchedNumber != 7)
	{
		touchedNumber = 0;
		transform.SendMessage("Command", 7);
	}
	else
	{
		touched = true;
		touchedNumber = 7;
	}
}
function Screen_8()
{
	if(touched == true && touchedNumber != 8)
	{
		touchedNumber = 0;
		transform.SendMessage("Command", 8);
	}
	else
	{
		touched = true;
		touchedNumber = 8;
	}
}
function Screen_9()
{
	if(touched == true && touchedNumber != 9)
	{
		touchedNumber = 0;
		transform.SendMessage("Command", 9);
	}
	else
	{
		touched = true;
		touchedNumber = 9;
	}
}

function turn() // 플레이어의 방향을 돌린다
{
	transform.rotation.y *= -1; // 90도에서 -90도로, -90도에서 90도로
	if(frontSight == true)
		frontSight = false;
	else
		frontSight = true;
}

function target_click() : boolean // 타겟을 터치 했을 때 처리 -> 기본공격
{
	if(frontSight == true){
		game_manager.SendMessage("Click_object", null);
		if(ClickObject.target == null) 
			return false;
			
		var sight : Vector3 = transform.position;
		sight.y = sight.y + 5;
		hitInfo = RaycastHit();
//		Debug.DrawRay(sight, Vector3.right * 10000, Color.red); // 디버그를 위해 디버그창에 Raycast 표시
		Physics.Raycast(sight, Vector3.right, hitInfo, 10000);
		
		var dist = ClickObject.target.transform.position.x - transform.position.x;
		
		Check_Motion();
		if(dist <= range && (ClickObject.target.tag == "monster" || ClickObject.target.tag == "boss")) { // 타겟이 몬스터, 보스일 경우 처리
			if(ClickObject.target == hitInfo.collider.gameObject && playerMotion != "attack0" && playerMotion != "attack1" && playerMotion != "skill2") {
				monsterAttack = true;
				player.SetBool("idleToAttack0", true);
				
				return true;
			}
		}
	}
	return false;
}

function check_position () { // 카메라 포지션, 플레이어 포지션 설정
	/*if(screenType > 0.7)
		maincamera.transform.position.x = transform.position.x + camera_position-1.5;
	else
		maincamera.transform.position.x = transform.position.x + camera_position;
		
	maincamera.transform.position.y = transform.position.y + 1.8;
	maincamera.transform.position.z = transform.position.z - 5.5; */
	
	if(screenType > 0.7)
		maincamera.transform.position.x = transform.position.x + camera_position-3;
	else
		maincamera.transform.position.x = transform.position.x + camera_position;
		
	maincamera.transform.position.y = transform.position.y + 8;
	maincamera.transform.position.z = transform.position.z - 45;
	
	moveforce = 0;
	jumpforce = false;
	transform.position.z = -4;
}