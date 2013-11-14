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

var bossGauge : Transform;

var maceTrail : Transform; // 칼의 궤적을 그린다.

private var amtMove : float;
private var moveDirection : Vector3 = Vector3.zero;
private var gravity : float = 40.0;

private var moving : boolean;

private var moveforce : int;

var fade : Transform;

private var moveStart : boolean; // 움직이는 도중이었는지, 멈췄다가 움직이는지 판별용.
private var attackCount : int;

private var bossMotion : String;

function Check_Motion()
{
	if(boss.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.idle0") && bossMotion != "idle")
		bossMotion = "idle";
	else if(boss.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.attack0") && bossMotion != "attack0")
		bossMotion = "attack0";
	else if(boss.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.attack1") && bossMotion != "attack1")
		bossMotion = "attack1";
	else if(boss.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.skill2") && bossMotion != "skill2")
		bossMotion = "skill2";
	else if(boss.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.death") && bossMotion != "death")
		bossMotion = "death";
	else if(boss.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.wound") && bossMotion != "wound")
		bossMotion = "wound";
	else if(boss.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.run") && bossMotion != "run")
		bossMotion = "run";
	else if(boss.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.dodge") && bossMotion != "dodge")
		bossMotion = "dodge";
	
}
function Start () {

	boss = transform.GetComponent(Animator);
	boss.speed = 0.8;
	
	amtMove = SetMonster.speed * Time.deltaTime;
	range = 8;
	speed = 10;
	damage = 5;
	hp = 100;
	
	moveforce = 1;
	moveStart = false;
	
	die = false;
	
	attackCount = 0;

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
	Check_Motion();
	
	transform.position.z = -4;
	
	if(bossMotion != "idle" && bossMotion != "death" && bossMotion != "wound" && bossMotion != "run" && bossMotion != "dodge")
		maceTrail.gameObject.SetActive(true);
	else
		maceTrail.gameObject.SetActive(false);
	
	if(!boss.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.idle0")) // 캐릭터 동작 상태가 idle 상태가 아닐 경우 모든 상태 초기화.
	{
		boss.SetBool("idleToAttack1", false);
		boss.SetBool("idleToAttack0", false);
		boss.SetBool("idleToWound", false);
		boss.SetBool("idleToSkill2", false);
		boss.SetBool("idleToDodge", false);
		boss.SetBool("idleToRun", false);
	}
	if(hp > 0)
		bossGauge.transform.localScale.x = (hp / 2.0) / 100.0;
	else
	{
		die = true;
		hp = 0;
		bossGauge.transform.localScale.x = 0;
		bossGauge.transform.localScale.y = 0;
		BossDie();
	}
	
	if(die == false)
	{
		if(di > range)
		{
		//	if(moveStart == false && di > 10)
		//	{
		//		moveStart=true;
				Move();
		//	}
		//	else if(moveStart == true)
		//	{
		//		Move();
		//	}
		}
		else if((di <= range) && (PlayerController.player_die == false))
		{
			Attack();
		}
	}
	
	if(moving == false && boss.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.run")) // 플레이어가 움직이지 않을 때는 멈추는 애니메이션 재생
	{
		moveStart = false;
		boss.SetBool("runToIdle", true);
	}
	else
		boss.SetBool("runToIdle", false);

}
function BossDie()
{
	if(bossMotion == "idle")
		boss.SetBool("idleToDeath", true);
	else if(bossMotion == "attack0")
		boss.SetBool("attackToDeath", true);
	
	yield WaitForSeconds(5);
	fade.transform.animation.Play("fadeout");
	yield WaitForSeconds(2);
	Application.LoadLevel("stageEnding");
	
}
function Attack()
{
	if(bossMotion == "idle")
	{
/*		var type : int = Random.Range(0, 10);
		if(type < 5)
		{
			boss.SetBool("idleToAttack0", true);
			damage = 5;
		}
		else */
			boss.SetBool("idleToAttack1", true);
			damage = 3;
	}
 /*
	if(attackCount % 3 == 0 && attackCount > 0)
	{
		TTT();
	}
	else
	{
		if(boss.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.idle0") == true)
		{
			var random : int = Random.Range(1, 3);
		/*	if(random == 1)
			{
				boss.SetBool("idleToAttack0", true);
			}
			else if(random == 2)
			{
				boss.SetBool("idleToAttack1", true);
			}
			else if(random == 3)
			{
				boss.SetBool("idleToAttack2", true);
			}
			else if(random == 4)
			{
				boss.SetBool("idleToSkill0", true);
			}
			else if(random == 5)
			{
				boss.SetBool("idleToSkill1", true);
			}
			else if(random == 6)
			{
				boss.SetBool("idleToSkill2", true);
			} 
			attackCount++;
			print("attackCount : " + attackCount + ", " + random);
		}
	} */
}