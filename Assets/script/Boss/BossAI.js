#pragma strict

private var boss : Animator;
var user : Transform;

static var visible : boolean;
static var range : int;
static var speed : int;
static var damage : int;
static var hp : int;
static var type : int;

static var die : boolean;

var maceTrail : Transform; // 칼의 궤적을 그린다.

private var amtMove : float;
private var moveDirection : Vector3 = Vector3.zero;
private var gravity : float = 40.0;

private var moving : boolean;

private var moveforce : int;

var fade : Transform;

function Start () {

	boss = transform.GetComponent(Animator);
	boss.speed = 0.6;
	
	amtMove = SetMonster.speed * Time.deltaTime;
	range = 10;
	speed = 10;
	damage = 3;
	hp = 6;
	
	moveforce = 1;
	
	die = false;

}
function Move()
{
	var controller : CharacterController = GetComponent(CharacterController);


	if (controller.isGrounded)
	{
	 	moveDirection = Vector3(0, 0, moveforce);
	 	moving = true;
	 	
	 	boss.SetBool("idleToRun", true);
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= speed;
	}

		moveDirection.y -= gravity * Time.deltaTime;
		controller.Move(moveDirection * Time.deltaTime);

}

function Update () {

	var di = transform.position.x - user.transform.position.x;
	moving = false;
	if(die == true)
	{
		BossDie();
		return;
	}
	if(!boss.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.idle0")) // 캐릭터 동작 상태가 idle 상태가 아닐 경우 모든 상태 초기화.
	{
		boss.SetBool("idleToAttack1", false);
		boss.SetBool("idleToAttack2", false);
		boss.SetBool("idleToAttack0", false);
		boss.SetBool("idleToWound", false);
		boss.SetBool("idleToSkill2", false);
		boss.SetBool("idleToSkill1", false);
		boss.SetBool("idleToSkill0", false);
		//boss.SetBool("idleToDodge", false);
		boss.SetBool("idleToRun", false);
	}
	
	if(die == false)
	{
		if(di > range)
		{
			Move();
		}
		else if((di <= range) && (PlayerController.player_die == false))
		{
			Attack();
		}
	}
	
	if(moving == false && boss.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.run")) // 플레이어가 움직이지 않을 때는 멈추는 애니메이션 재생
	{
		boss.SetBool("runToIdle", true);
	}
	else
		boss.SetBool("runToIdle", false);

}
function BossDie()
{
	boss.SetBool("idleToDeath", true);
	yield WaitForSeconds(8);
	fade.transform.animation.Play("fadeout");
	yield WaitForSeconds(2);
	Application.LoadLevel("stageEnding");
	
}
function Attack()
{
	boss.SetBool("idleToAttack1", true);
}