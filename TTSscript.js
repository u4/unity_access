/*
Authors: 
Thomas Westin, Stockholm university, dsv.su.se (Unity script)
Staffan Åhlvik, Stockholm university, dsv.su.se (PHP script)

Purpose: 
Use Google Text-to-speech in Unity to make games more accessible.

Usage:
1. Create a game object e.g. "TTS" with an AudioSource
2. Attach this script (named TTSscript to the TTS game object)
3. In any other game object which needs it:
4. TTS = GameObject.Find("TTS");
5. TTS.GetComponent(TTSscript).Say("South"); 

License: 
This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License

Disclaimer:
This script is published as is. The creators are not be responsible in anyway for any consequences of using it.

Dependencies:
Requires the following PHP script to be run on a webserver.

<?
$tl = $_REQUEST['tl'];
$q = $_REQUEST['q'];

if($tl && $q){
        if($tl == 'ja'){
                $json = file_get_contents('http://mymemory.translated.net/api/get?langpair=en|'.$tl.'&q='.$q);
                $json = json_decode($json, true);
                $q = $json['responseData']['translatedText'];
        }

        $file = file_get_contents('http://translate.google.com/translate_tts?tl='.$tl.'&q='.urlencode($q));
        $tmp = '/tmp/'.md5($tl.$q).'.mp3';
        file_put_contents($tmp, $file);

        $command = "ffmpeg -i $tmp -acodec libvorbis $tmp.ogg";
        exec($command, $output);

        if (file_exists("$tmp.ogg")) {
            header("Content-Type: audio/ogg");
            header('Content-Length: ' . filesize("$tmp.ogg"));
            header('Content-Disposition: inline; filename="'.basename($tmp).'.ogg"');
            header('X-Pad: avoid browser bug');
            header('Cache-Control: no-cache');
            readfile("$tmp.ogg");
            unlink("$tmp.ogg");
        }else{
                print $tl.'<br />';
                print $q.'<br />';
                print "no file generated @ $tmp <br /> $command <br /> ";
                //header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found', true, 404);
        }
        unlink($tmp);
}else{
        print "wrong arguments";
        //header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found', true, 404);
}
?>

History: 

2013: version 0.1 published on Github

*/

#pragma strict

var VoiceAudio : AudioSource; 

VoiceAudio = this.audio;

function Say (theText : String) {
    var url : String = "http://www.yourdomain.se/translate_tts.php?tl=en&q=";
    var urlText = WWW.EscapeURL(theText);
    //print (urlAndText);
	var www : WWW = new WWW(url + urlText);
	//print ("Start loading: " + Time.realtimeSinceStartup);
	yield www;
	//print ("Finished loading: " + Time.realtimeSinceStartup);	
	var threeD = false;
    	var stream = false;
	VoiceAudio.clip = www.GetAudioClip(threeD, stream, AudioType.OGGVORBIS);
	//Note: no clip name is generated but it works anyway
	VoiceAudio.Play();
	www.Dispose();
}

function Update () {

}