#pragma strict

/* 몬스터 피격시 데미지 연산 및 몬스터 체력 변경. 몬스터 사망시 제거. */

private var game_manager : GameObject;

private var fight : boolean = false;
private var die : int = 0;

private var sword_damage : int;
private var user_damage : int;
private var skil_damage : float;


// 소리
var attack_Sound : AudioClip;

function Start(){
	game_manager = GameObject.Find("GameManager");
	transform.animation["gethit"].speed = 2;
	if(transform.tag == "boss")
		transform.animation["death"].speed = 0.5;
	else
		transform.animation["die"].speed = 2;
		
	sword_damage = 1;
	user_damage = 8;
}

function Update(){

	if(HP.enemy_hp <=0 && fight == true && die == 0){
		HP.enemy_hp = 0;
		
		if(transform.tag == "boss")
		{
			transform.gameObject.animation.Play("death");
			BossAI.die = true;
			game_manager.SendMessage("Fadeout", "stage05", SendMessageOptions.DontRequireReceiver);
		}
		else
		{
			transform.gameObject.animation.Play("die");
			transform.SendMessage("SetDie", SendMessageOptions.DontRequireReceiver);
		}
		
		die = 1;
	}
	if(die) die++;
	if(die == 70 && transform.tag != "boss"){
		transform.position.y = -100;
		Destroy(transform.gameObject);
	}
}
function OnTriggerEnter(target : Collider)
{
	if(target.gameObject.name == "weapon_mace"){
		if(PlayerController.playerMotion != "idle" && PlayerController.playerMotion != "run" && PlayerController.playerMotion != "wound" && PlayerController.monsterAttack == true) // 플레이어가 공격중일 때만
		{
			HP.enemy_hp = HP.enemy_hp - Attack_check();
			PlayerController.monsterAttack = false;
			transform.animation.Play("gethit");
			PlayAttackSound();
			Effect(target);
		}
	}
}

function Attack_check() : int{
	if(PlayerController.playerMotion == "attack0"){
		fight = true;
		skil_damage = 1.0;
		return user_damage * sword_damage * skil_damage;
	}
	else if(PlayerController.playerMotion == "attack1"){
		fight = true;
		skil_damage = 1.3;
		return user_damage * sword_damage * skil_damage;
	}
}

function Effect (target : Collider) {
	var position = transform.position;
	position.y += 6.5;
	position.z -= 1;

	//position.z += 1.5;
	var spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
	spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
	spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
	spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
//	var step = Instantiate(Resources.Load("WaterStep"), position, target.transform.rotation);
//	step = Instantiate(Resources.Load("WaterStep"), position, target.transform.rotation);
}
function PlayAttackSound()
{
	if(audio.isPlaying == false)
	{
		audio.clip = attack_Sound;
		audio.Play();
	}
}