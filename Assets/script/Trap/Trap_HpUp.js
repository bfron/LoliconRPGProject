#pragma strict

var HpUpTrap : Transform;

private var enterCount : int;

function Start () {

	enterCount = 0;

}

function OnTriggerEnter (target : Collider) {
	if(target.name == "주인공")
	{
		if(enterCount == 0)
			ActiveTrap();
		//else
		//	OffTrap();
	}
}
function ActiveTrap()
{
	yield WaitForSeconds(0.55);
	HpUpTrap.animation.Play("ActiveTrap");
	enterCount++;
}
function OffTrap()
{
	HpUpTrap.gameObject.SetActive(false);
}