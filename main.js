img = "";
status="";
object= [];




function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function preload()
{
    img=loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_trICzh1MO35DcVXR_KfvjSwr2_rvShgdQ&usqp=CAU');
}
function draw()
{
    image(video,0,0,380,380);
    if(status != "")
    {
        for(i=0; i<object.length;i++)
        {
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "status-object detected";
            document.getElementById("number_of_objects").innerHTML ="Number of object detected are : " +object.length;
            fill(r,g,b);
            percent = floor(object[i].confidence*100);
            text(object[i].label+ " "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
    /*fill("#cca20c");
    text("Dog",45,75);
    noFill();
    stroke("#ff0000");
    rect(30,60,450,350);

    fill("#cca20c");
    text("Cat",320,120);
    noFill();
    stroke("#ff0000");
    rect(300,90,270,320);

    fill("#cca20c");
    text("bowl",280,320);
    noFill();
    stroke("#ff0000");
    rect(270,300,150,110);*/
}
function modelLoaded()
{
    console.log("model loaded");
    status = true;
    object_detector.detect(video,gotResult);
}
function gotResult(error,results)
{
    if(error)
    {
        console.log("error");
    }
    console.log(results);
    object = results;
}
function start()
{
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "status-detecting objects";
}