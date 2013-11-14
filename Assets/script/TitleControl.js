#pragma strict

private var boss : Animator;
private var amtMove : float;
private var moveDirection : Vector3 = Vector3.zero;
private var gravity : float = 40.0;

var maincamera : Transform;
private var camera_position : float = 10;
private var screenType : float; // 현재 구동되고 있는 화면비

var tree1 : Transform;
var tree2 : Transform;

function Start () {
		boss = transform.GetComponent(Animator);
}

function Update () {
	if(transform.position.x >= tree2.transform.position.x)
	{
		transform.position.x = tree1.transform.position.x;
		transform.position.y = -0.1815467;
	}
	check_position ();
	Move();
	
	if(Input.GetButtonUp("Touch"))
		Application.LoadLevel("stage00");
}
function Move()
{
	var controller : CharacterController = GetComponent(CharacterController);

	if (controller.isGrounded)
	{
	 	moveDirection = Vector3(0, 0, 1);
	 	
 		boss.SetBool("idleToRun", true);
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= 20;
	}

		moveDirection.y -= gravity * Time.deltaTime;
		controller.Move(moveDirection * Time.deltaTime);

}
function check_position () { // 카메라 포지션, 플레이어 포지션 설정
	
	if(screenType > 0.7)
		maincamera.transform.position.x = transform.position.x + camera_position-3;
	else
		maincamera.transform.position.x = transform.position.x + camera_position;
		
	maincamera.transform.position.y = transform.position.y + 8;
	maincamera.transform.position.z = transform.position.z - 45;
}