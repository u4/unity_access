/*
Authors: 
Thomas Westin, pininteractive.com 
Stig Nordeson, pininteractive.com

Purpose: Give player a sound based orientation.

Usage:
script("Sound_compass_class").new(vector(0,0,1), "compass_high_sound", "compass_low_sound")

Dependencies:
None

To be done:
- Voice feedback on demand of eight directions (N, NW, W…)
- Clean up some of the script
- On and off toggle switch, with voice feedback ("Compass on", "Compass off")

History: 

2001-2002:
Developed for Terraformers, www.terraformers.nu, by Pin Interactive AB, using Macromedia/Adobe Director

2007:
Released for the GAIM with a Creative Commons License. BY NC SA. 
Read more at http://people.dsv.su.se/~thomasw/gaim
Modifications: 
- Commercial, compiled 3D Sound Xtra is replaced by the 3DSound_class script
- Speech synthezis instead of recorded voice 

2012:
Translated to UnityScript by Thomas Westin
*/


#pragma strict

var ForwardDirection : Vector3;
var CompassOn : int; 
var Speaking : int; 
var Source : AudioSource; //3D sound source
var HighClip : AudioClip; //sound clip
var LowClip : AudioClip; //sound clip
var SoundCompass : GameObject;
var SimpleCar : GameObject;

init(Vector3(0,0,1), 1, "CompassHigh", "CompassLow");

function init (lvForwardDirection : Vector3, lbCompassOn : int, lsCompassHighSound : String, lsCompassLowSound : String) {
  
  //set properties
  ForwardDirection = lvForwardDirection;
  CompassOn = lbCompassOn;
  Speaking = 0;
  
  //Get the 3D sound source component
  Source = SoundCompass.GetComponent(AudioSource);
  
  //Set the audio clip
  Source.clip = HighClip;
  Source.loop = true;
  
  //Set the volume
  Source.volume = 1.0; //range 0.0-1.0 

  //Load clip from Resources folder
  //AudioClip clip = Resources.Load(clipName)as AudioClip;
  
  Source.pitch = 1.0; // 1.0 = normal. Range -3.0, +3.0
  Source.Play ();
 
}

function Update () {
  
  //set current sound compass audio depending on avatar orientation
  //this helps player get if facing NW / N / NE or SW / S / SE

  var ori : Quaternion = SimpleCar.transform.rotation;

  print (ori);

  if (ori.w < 0) {
    Source.clip = LowClip;
    Source.loop = true;
  }
    
  if (ori.w >= 0) {
    Source.clip = HighClip;
    Source.loop = true;
  }
     
  //set sound compass position relative avatar position
  SoundCompass.transform.position.x = SimpleCar.transform.position.x;
  SoundCompass.transform.position.y = SimpleCar.transform.position.y;
  SoundCompass.transform.position.z = SimpleCar.transform.position.z + 10;
  
}