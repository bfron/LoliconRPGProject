#pragma strict

/* 유저 피격시 데미지 연산. 사망시 사망 화면 호출. */

private var game_manager : GameObject;
private var fight : boolean = false;
private var skil_damage : float;
private var player : Animator; // 플레이어 Animator]

//소리
var attack_Sound : AudioClip;

// 효과
var woundEffect : Transform;
private var beforeEffect : Transform;

private var userDie : boolean;

function Start () {
	userDie = false;
	game_manager = GameObject.Find("GameManager");
	player = transform.GetComponent(Animator);
	beforeEffect = null;
/*	transform.animation["run"].speed = 2.5;
	transform.animation["attack"].speed = 1.5;
	transform.animation["gethit"].speed = 0.5; */
}

function Update() {
	if(HP.hero_hp <= 0 && userDie == false){
		userDie = true;
		PlayerController.player_die = true;
		PlayerDie();
	}
}
function PlayerDie()
{
	player.SetBool("idleToDeath", true);
	yield WaitForSeconds(1);
	game_manager.SendMessage("Fadeout", "deathStage", SendMessageOptions.DontRequireReceiver);
}

function OnTriggerEnter(target : Collider)
{
/*	game_manager.SendMessage("Check_motion", transform.gameObject);
	if(CheckMotion.motion == MOTION.ducking || CheckMotion.motion == MOTION.die) return; */
	
	transform.SendMessage("Check_Motion", SendMessageOptions.DontRequireReceiver);
	if(PlayerController.playerMotion == "dodge")
	{
		print("피하는중!");
		return;
	}
	
	if(target.gameObject.tag == "magic"){
		HP.hero_hp -= 10;
		player.SetBool("idleToWound", true);
		return;
	}
	
	if(target.transform.root.name != "주인공")
	{
		if(target.transform.root.tag == "boss")
		{
			if(target.transform.root.animation["attack 3"].normalizedTime >= 0.3 || target.transform.root.animation["attack2"].normalizedTime >= 0.4){
				//if(target.transform.root.tag == "monster"){
					HP.hero_hp = HP.hero_hp - Attack_check(target);
					player.SetBool("idleToWound", true);
					PlayAttackSound();
					Effect();
				//}
			}
		}
		else
		{
			if(target.transform.root.animation["attack"].normalizedTime >= 0.3){
				if(target.transform.root.tag == "monster"){
					HP.hero_hp = HP.hero_hp - Attack_check(target);
					player.SetBool("idleToWound", true);
					PlayAttackSound();
					Effect();
				}
			}
		}
	}
	
}

function Attack_check(target : Collider) : int{
	var monster_damage : int;
	
	if(target.transform.root.tag == "boss"){
		monster_damage = BossAI.damage;
	}else{
		target.transform.root.SendMessage("ReturnDamage");
	}
	game_manager.SendMessage("Check_motion", target.gameObject);
	//game_manager.SendMessage("Set_monster",target.transform.root);
	if(target.transform.root.tag != "boss"){
		if(CheckMotion.motion == MOTION.idle){
			return 0;
		}
	}
	if(CheckMotion.motion == MOTION.attack){
		fight = true;
		skil_damage = 1;
		return SetMonster.damage * skil_damage;
	}
	
	if(target.transform.root.animation.IsPlaying("idle") == true){
		return 0;
	}
	if(target.transform.root.animation.IsPlaying("attack2") == true){
		fight = true;
		skil_damage = 1;
		return monster_damage * skil_damage;
	}
	if(target.transform.root.animation.IsPlaying("attack 3") == true){
		fight = true;
		skil_damage = 1.5;
		return monster_damage * skil_damage;
	}
}

function Effect() { 
	print("이펙트!");
	var position = transform.position;
	position.z -= 3;
	position.y += 6;
	if(beforeEffect != null)
		Destroy(beforeEffect.gameObject);
	beforeEffect = Instantiate(woundEffect, position, Random.rotation);//Random.rotation);
/*	spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
	spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
	spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation); */
}
function PlayAttackSound()
{
	if(audio.isPlaying == false)
	{
		audio.clip = attack_Sound;
		audio.Play();
	}
}