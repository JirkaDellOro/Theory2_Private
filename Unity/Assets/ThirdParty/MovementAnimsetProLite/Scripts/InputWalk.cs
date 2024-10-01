using UnityEngine;
using System.Collections;


public class InputWalk : MonoBehaviour {
	
	protected Animator animator;
	
	public float DirectionDampTime = .25f;
	
	void Start () 
	{
		animator = GetComponent<Animator>();
	}
	
	void Update () 
	{
		if(animator)
		{
			//get the current state
			//AnimatorStateInfo stateInfo = animator.GetCurrentAnimatorStateInfo(0);
			
		
			
			float h = Input.GetAxis("Horizontal");
			float v = Input.GetAxis("Vertical");
			
			//set event parameters based on user input
			animator.SetFloat("Speed", v*v);
			//animator.SetFloat("Direction", v, DirectionDampTime, Time.deltaTime);
			
			this.transform.Rotate(Vector3.up * h * 3);
		}		
	}   		  
}