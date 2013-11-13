#pragma strict

var game_manager : GameObject;

private var fight : boolean = false;
private var die : int = 0;

private var sword_damage : int;
private var user_damage : int;
private var skil_damage : float;

var attack_Sound : AudioClip;

// 효과
var woundEffect : Transform;
private var beforeEffect : Transform;


function Start () {
	sword_damage = 1;
	user_damage = 8;

}

function Update () {
	if(BossAI.hp <=0 && fight == true && die == 0)
	{
		BossAI.hp = 0;
		
		BossAI.die = true;
		print("보스 다이 으앙쥬금");
		
		die = 1;
	}

}
function OnTriggerEnter(target : Collider)
{
	if(target.gameObject.name == "weapon_mace"){
		if(PlayerController.playerMotion != "idle" && PlayerController.playerMotion != "run" && PlayerController.playerMotion != "wound" && PlayerController.monsterAttack == true) // 플레이어가 공격중일 때만
		{
			BossAI.hp = BossAI.hp - Attack_check();
			PlayerController.monsterAttack = false;

			PlayAttackSound();
			WoundEffect();
		}
	}
}
function Attack_check() : int{
	if(PlayerController.playerMotion == "attack0"){
		fight = true;
		skil_damage = 1.0;
		print("뭐냐 : " + user_damage * sword_damage * skil_damage);
		return user_damage * sword_damage * skil_damage;
	}
	else if(PlayerController.playerMotion == "attack1"){
		fight = true;
		skil_damage = 1.3;
		return user_damage * sword_damage * skil_damage;
	}
}
function WoundEffect() { 
	var position = transform.position;
	position.z -= 3;
	position.y += 6;
	if(beforeEffect != null)
		Destroy(beforeEffect.gameObject);
	beforeEffect = Instantiate(woundEffect, position, Random.rotation);//Random.rotation);
}
function PlayAttackSound()
{
	if(audio.isPlaying == false)
	{
		audio.clip = attack_Sound;
		audio.Play();
	}
}