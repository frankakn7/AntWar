/*
var antImg = new Image();
antImg.src = "Ant.png";
*/

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

window.onload = function(){
	for(var i = 0; i < 100; i++){
		generateAnt(Math.floor(Math.random()*1200),Math.floor(Math.random()*650));
	}
}