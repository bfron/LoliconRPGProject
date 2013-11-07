#pragma strict

/* 커멘드 처리 */

enum SKILL{attack1, skill2};

private var stack : int[];
private var oldInput : int;
private var count = -1;

private var player : Animator;

private var player_skill = [
						[6, 3, 2], // attack1
						[6, 9, 8]  // skill2
					];

function Start()
{
	oldInput = 0;
	player = transform.GetComponent(Animator);
	stack = new int[3];
}

function Command (button : int){
	if(button == oldInput || button == 5 || count > 2)
		return;
	
	count++;
	oldInput = button;
	stack[count] = button;
	
	if(count >= 2)
	{
		Search_command();
	}
}

function Skill (skil : SKILL) {
	switch(skil){
	case SKILL.attack1:
		player.SetBool("idleToAttack1", true);
		PlayerController.monsterAttack = true;
		print("어택1");
		break;
	case SKILL.skill2:
		player.SetBool("idleToSkill2", true);
		PlayerController.monsterAttack = true;
		print("스킬2");
		break;
	}
}
function Search_command() {
	for(var i=0;i<player_skill.length;i++)
	{
		for(var j=0;j<player_skill[i].length;j++)
		{
			if(stack[j] != player_skill[i][j])
				break;
				
			if(j == player_skill.Length -1)
				Skill(i);
		}
	}
	
	count = -1;
}

function CommandStackClear()
{
	stack = new int[3];
	count = -1;
}