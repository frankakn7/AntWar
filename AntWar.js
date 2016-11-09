var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/*
var antImg = new Image();
antImg.src = "Ant.png";
*/

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

var ants = [];
var antNum = 1;

var mouseX, mouseY;

var lassoX1,lassoY1,lassoX2,lassoY2,isMouseDragging;

function ant(	x,y,oldX,oldY,height,width,
				spdX,spdY,moveX,moveY,movePosX,
				movePosY,moveAngle,dif,difTol,
				selected,isMoving){
	this.x = x;
	this.y = y;
	this.oldX = oldX;
	this.oldY = oldY
	this.height = height;
	this.width = width;
	this.spdX = spdX;
	this.spdY = spdY;
	this.moveX = moveX;
	this.moveY = moveY;
	this.movePosX = movePosX;
	this.movePosY = movePosY;
	this.moveAngle = moveAngle;
	this.dif = dif;
	this.difTol = difTol;
	this.selected = selected;
	this.isMoving = isMoving
	
	this.detect = function(){
		for(var i in ants){
			if(this != ants[i]){
				if(	this.x <= ants[i].x + ants[i].width - ants[i].spdX
		            && ants[i].x <= this.x + this.width - ants[i].spdX
		            && this.y <= ants[i].y + ants[i].height - ants[i].spdY
		            && ants[i].y <= this.y + this.height - ants[i].spdY){
			        
					//ctx.clearRect(this.x,this.y,this.width,this.height);
					if(this.dif > ants[i].dif){
						if(this.oldX != this.x || this.oldY != this.y){
							this.x = this.oldX;
							this.y = this.oldY;
						}
					}else{
						if(ants[i].oldX != ants[i].x || ants[i].oldY != ants[i].y){
							ants[i].x = ants[i].oldX;
							ants[i].y = ants[i].oldY;
						}
					}
					//ctx.drawImage(antImg,this.x,this.y);
		        }
			}
	    }
	}
	
	this.move = function(){
		if(this.dif > this.difTol){
			this.moveAngle = Math.atan2(this.moveY, this.moveX)/Math.PI * 180;
			
			this.spdX = Math.cos(this.moveAngle/180*Math.PI)*5;
			this.spdY = Math.sin(this.moveAngle/180*Math.PI)*5;

			//ctx.clearRect(this.x,this.y,this.width,this.height);
			
			this.oldX = this.x;
			this.oldY = this.y;
				
			this.x += this.spdX;
			this.y += this.spdY;
			
			//ctx.drawImage(antImg,this.x,this.y);
			
			this.dif = Math.abs(this.movePosX - this.x)+Math.abs(this.movePosY - this.y);
			this.isMoving = true;
		}else{
			this.isMoving = false;
		}
	}
	
	this.inBox = function(x1,y1,x2,y2){
		 return (this.x-x1)*(this.x-x2) < 0 &&
              	(this.y-y1)*(this.y-y2) < 0;	
    }
	
	this.drawSelectBox = function() {
		OutlineRect(this.x-3, this.y-3, this.x+this.width+3, this.y+this.height+3, 'green');
	}
}

function generateAnt(x,y){
	ants[antNum] = new ant();
	ants[antNum].x = x;
	ants[antNum].y = y;
	ants[antNum].oldX = 0;
	ants[antNum].oldY = 0;
	ants[antNum].height = 10;
	ants[antNum].width = 10;
	ants[antNum].spdX = 0;
	ants[antNum].spdY = 0;
	ants[antNum].moveX = 0;
	ants[antNum].moveY = 0;
	ants[antNum].movePosX = 0;
	ants[antNum].movePosY = 0;
	ants[antNum].moveAngle = 0;
	ants[antNum].dif = 0;
	ants[antNum].difTol = 15;
	ants[antNum].selected = false;
	ants[antNum].isMoving = false;
	
	//ctx.drawImage(antImg,ants[antNum].x,ants[antNum].y);
	ctx.fillRect(ants[antNum].x,ants[antNum].y,ants[antNum].width,ants[antNum].height);
	antNum ++;
}

window.onload = function(){
	for(var i = 0; i < 100; i++){
		generateAnt(Math.floor(Math.random()*1200),Math.floor(Math.random()*650));
	}
}

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


function update(){
	ctx.clearRect(0,0,1200,650);
	for(var i in ants){			
		
		ants[i].move();
		ants[i].detect();
		ctx.fillStyle = 'black';
		ctx.fillRect(ants[i].x,ants[i].y,ants[i].width,ants[i].height);
		
		if(ants[i].selected){
			ants[i].drawSelectBox();
		}
		
		if(isMouseDragging){
			OutlineRect(lassoX1, lassoY1, lassoX2, lassoY2, 'red')
		}
	}
	
	setTimeout(update, 1000/20);
}

update();