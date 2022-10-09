Shinchan = "";
objects = [];
status = "";


function preload()
{
    Shinchan = loadSound("Shinchan.mp3");
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("modelLoaded");
    status = "true";

    
}

function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }

    console.log(results);
    objects = results;
    console.log(objects[0].label);
}

function draw()
{
    image(video, 0, 0, 380, 380);
    if (status != "")
    {   
        R = random(255);
        G = random(255);
        B = random(255);
        objectDetector.detect(video, gotResults);

    for (i = 0; i < objects.length; i++) 
        {
            console.log(objects.length);
            document.getElementById("status").innerHTML = "Status : Baby Shinchan Detected";
            fill(R, G, B);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(R, G, B); 
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person")
            {
                document.getElementById("NOB").innerHTML = "Number Of Baby Shinchan : " + objects.length;
                Shinchan.stop();

                
            }

            else
            {
                document.getElementById("NOB").innerHTML = "Number Of Baby Shinchan : " + objects.length;
                Shinchan.play();

            }

        
        }
        if (objects.length == 0)
        {
            document.getElementById("NOB").innerHTML = "Number Of Baby Shinchan : " + objects.length;
            Shinchan.play();

        }

    }
}   