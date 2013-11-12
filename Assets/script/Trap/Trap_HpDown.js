#pragma strict

var HpDownTrap : Transform;

private var trapActive : boolean;

function Start () {

	trapActive = false;

}

function OnTriggerEnter (target : Collider) {
	if(target.name == "주인공")
	{
		if(trapActive == false)
			ActiveTrap();
	}
}

function ActiveTrap()
{
	yield WaitForSeconds(0.55);
	HpDownTrap.transform.animation["ActiveTrap"].speed = 1.5;
	HpDownTrap.animation.Play("ActiveTrap");
	trapActive = true;
	yield WaitForSeconds(2);
	HpDownTrap.animation.Play("OffTrap");
	trapActive = false;
}