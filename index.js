
let calcDiv = document.getElementById('calculation')
let myHeightInput = document.getElementById('own-height')
let otherHeightInput = document.getElementById('other-height')



myHeightInput.addEventListener('change', hypotenuse) 
otherHeightInput.addEventListener('change', hypotenuse) 

function hypotenuse(){
    var myHeight = parseFloat(myHeightInput.value)
    var otherHeight = parseFloat(otherHeightInput.value)
    var safeHypotenuse = 200
    var heightDiff = Math.abs(myHeight - otherHeight)
    var safeHorizontal = Math.round(Math.sqrt(Math.pow(safeHypotenuse, 2) - Math.pow(heightDiff, 2)),2)
    calcDiv.innerHTML = `Step away ${safeHorizontal}cm away from the other person`

    var isUserShorter = myHeight < otherHeight ? 1 : 0; //ternary operator: 1 if user is shorter 0 else
    drawVisualization(safeHorizontal, heightDiff, isUserShorter, myHeight, otherHeight)
}

function drawVisualization(xWidth, yHeight, leftShorter, ownImageHeight, otherImageHeight){
    var canvas = document.getElementById('triangle'); 
    canvas.width = xWidth + 100;
    canvas.height = yHeight + 40;

    var canvasContainer = document.getElementById('visualization');
    canvasContainer.width = xWidth + 120; //not using this because text can go inside diagram
    canvasContainer.height = yHeight + 50;

    //var myImage = document.getElementById('user-image');
    //myImage.height = ownImageHeight
    //myImage.style.left = '400px'

    //var otherImage=document.getElementById('other-image');
    //otherImage.height = otherImageHeight;

    if (canvas.getContext){
        var context = canvas.getContext('2d');
        var startX = 30
        var startY = yHeight + 5
        context.strokeStyle = '#e84a5f'
        context.lineWidth = 3
        context.font = "13px Roboto"
        context.fillStyle = "#ff847c"

        if (leftShorter == 1){            
            context.beginPath(); // Reset the current path            
            context.moveTo(startX, startY); // Starting point          
            context.lineTo(startX + xWidth , startY - yHeight); // End point - hypotenuse (remember that positive y value goes downwards)            
            context.lineTo(startX + xWidth, startY) // End point - vertical line            
            context.lineTo(startX, startY); // End point - horizontal line
            
            context.stroke(); // Make the line visible
            
            // Put the dimensions as text
            context.fillText(`${yHeight}cm`, startX + xWidth + 5, startY/2);
            context.fillText(`${xWidth}cm`, (startX + xWidth)/2, startY + 15);
            //context.rotate(-angle * Math.PI / 180); //I could calculate the angle but not important
            context.fillText(`200cm`, (startX + xWidth)/3.5, startY/2);


        } else {
            startX = 50
            context.beginPath(); 
            context.moveTo(startX + xWidth, startY);
            context.lineTo(startX , startY - yHeight);
            context.lineTo(startX, startY)
            context.lineTo(startX + xWidth, startY);
            context.stroke();
            context.fillText(`${yHeight}cm`, 5, startY/2);
            context.fillText(`${xWidth}cm`, (startX + xWidth)/2, startY + 15);
            context.fillText(`200cm`, (startX + xWidth) - (startX + xWidth)/3.5, startY/2);

        }

        
   }

}


/* tutorial:
https://www.w3resource.com/html5-canvas/html5-canvas-lines.php
https://levelup.gitconnected.com/how-to-create-a-simple-web-app-using-javascript-d27b28459fad
https://stackoverflow.com/questions/26946235/pure-javascript-listen-to-input-value-change
https://medium.com/@singhamritpal49/creating-simple-addition-calculator-with-javascript-563ede3527e2
https://stackoverflow.com/questions/14757659/loading-an-image-onto-a-canvas-with-javascript
https://www.w3schools.com/jsref/met_element_setattribute.asp
https://www.tutorialspoint.com/css/css_positioning.htm
https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Publishing_your_website //deploy!
*/
