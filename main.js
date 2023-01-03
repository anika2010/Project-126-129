song1="";
song2="";
right_wrist_x=0;
right_wrist_y=0;
left_wrist_x=0;
left_wrist_y=0;
score_right_wrist=0;
score_left_wrist=0;
song1_status="";
song2_status="";
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(400,400);
    canvas.center()
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modalLoaded);
    poseNet.on('pose',gotPoses);

}
function modalLoaded(){
    console.log('Modal is loaded');
}
function gotPoses(results){
if(results.length>0){
    console.log(results);
    score_right_wrist=results[0].pose.keypoints[10].score;
    score_left_wrist=results[0].pose.keypoints[9].score;
    left_wrist_x=results[0].pose.leftWrist.x;
    left_wrist_y=results[0].pose.leftWrist.y;
    right_wrist_x=results[0].pose.rightWrist.x;
    right_wrist_y=results[0].pose.rightWrist.y;



}
}
function draw(){
     image(video,0,0,400,400);
     fill('#FF0000');
     stroke('#FF0000');
     song1_status=song1.isPlaying();
     song2_status=song2.isPlaying();
     if(score_left_wrist>0.2){
         circle(left_wrist_x,left_wrist_y,20);
        song2.stop();
        if(song1_status=false){
            song1.play();
            document.getElementById("song_name").innerHTML="Song Name-Peter Pan";
        }

       
       
       
    
     }
     if(score_right_wrist>0.2){
         circle(right_wrist_x,right_wrist_y,20);
         song1.stop();
        if(song2_status=false){
            song2.play();
            document.getElementById("song_name").innerHTML="Song Name-Harry Potter Theme";
        }

     }
}
function play(){  
    song.play();
    song.rate(1);
    song.setVolume(1);
}
  


