
/*
Authors: 
Thomas Westin, pininteractive.com 
Stig Nordeson, pininteractive.com

Purpose: Give player a sound based "walking stick" of infinite (or optionally, varied) length.
Relates to: http://www.gameaccessibilityguidelines.com/guidelines/advanced/#sonar

Usage:
init(1);

Dependencies:
Sonar game objects must be in Layer: Ignore Raycast

To be done:
- Detect different surfaces by reading tags (set as UserData?)
- Pitch up for objects with which you interact, else pitch down
- Use Google TTS speech to read any tag out aloud, in (virtually) any language
- Say tag name on demand (e.g. by keypress)
- Say object name aloud automatically for some objects, e.g. hostile NPCs
- Argument to set length of sonar raycast (else infinite length)

History: 

2001-2003:
Developed for Terraformers, www.terraformers.nu, by Pin Interactive AB, using Macromedia/Adobe Director

2013:
Translated to Unity by Thomas Westin
*/


#pragma strict

var SonarOn : int; 
var Speaking : int; 
var Source : AudioSource; //3D sound source
var SonarSoundClip : AudioClip; //sound clip
var SonarSoundGO : GameObject;

init(1);

function init (lbSonarOn : int) {
  
  //set properties
  SonarOn = lbSonarOn;
  Speaking = 0;
  
  //Get the 3D sound source component
  Source = SonarSoundGO.GetComponent(AudioSource);
  
  //Set the audio clip
  Source.clip = SonarSoundClip;
  Source.loop = true;
  
  //Set the volume
  Source.volume = 1.0; //range 0.0-1.0 

  //Load clip from Resources folder
  //AudioClip clip = Resources.Load(clipName)as AudioClip;
  
  Source.pitch = 1.0; // 1.0 = normal. Range -3.0, +3.0
  Source.Play ();
 
}

function Update () {
  
  var hit : RaycastHit;
  var fwd = transform.TransformDirection (Vector3.forward);
  
    if (Physics.Raycast (transform.position, fwd, hit)) {
        print ("There is something in front you!");
        Source.volume = 1.0; //range 0.0-1.0 
        Source.pitch = 1.0;
        SonarSoundGO.transform.position = hit.point;
    } else {
     print ("There is nothing there");
     Source.volume = 0.0; //range 0.0-1.0 
     SonarSoundGO.transform.position = transform.position;
    }
    
}