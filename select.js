
var mouseX, mouseY;

var lassoX1,lassoY1,lassoX2,lassoY2,isMouseDragging;


canvas.addEventListener('contextmenu', function(evt) { 
  evt.preventDefault();
}, false);

canvas.addEventListener('mousemove', function(evt) {
	
	if (evt.offsetX) {
        mouseX = evt.offsetX;
        mouseY = evt.offsetY;
    }
    else if (evt.layerX) {
        mouseX = evt.layerX;
        mouseY = evt.layerY;
    }
	
	if(isMouseDragging){
		lassoX2 = mouseX;
		lassoY2 = mouseY;
	}
});

canvas.addEventListener('mousedown', function(evt){
	if(evt.button === 0){
		lassoX1 = mouseX;
		lassoY1 = mouseY;
		lassoX2 = lassoX1;
		lassoY2 = lassoY1;
		isMouseDragging = true;
	}
	if(evt.button === 2){
		for(var i in ants){
			if(ants[i].selected){	
				ants[i].difTol = 15;
				
				ants[i].movePosX = mouseX;
				ants[i].movePosY = mouseY;
				
				ants[i].moveX = mouseX;
				ants[i].moveY = mouseY;
				
				ants[i].moveX -= ants[i].x;
				ants[i].moveY -= ants[i].y;
						
				ants[i].dif = Math.abs(mouseX - ants[i].x)+Math.abs(mouseY - ants[i].y);
			}
		}
	}
});

canvas.addEventListener('mouseup', function(evt){
	if(evt.button === 0){
		isMouseDragging = false;
		for(var i in ants){
			if(mouseMovedEnoughToTreatAsDrag()){
				ants[i].selected = false;
				
				if(ants[i].inBox(lassoX1,lassoY1,lassoX2,lassoY2)){
					ants[i].selected = true;
				}
			}else{
				ants[i].selected = false;
			}
		}
	}
});


function OutlineRect(corner1X, corner1Y, corner2X, corner2Y, lineColor) {
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.rect(corner1X, corner1Y, corner2X-corner1X, corner2Y-corner1Y);
    ctx.stroke();
}

 function mouseMovedEnoughToTreatAsDrag() {
     var deltaX = lassoX1-lassoX2;
     var deltaY = lassoY1-lassoY2;
     var dragDist = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
     return ( dragDist > 10 );
}