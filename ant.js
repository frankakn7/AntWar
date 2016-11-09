var ants = [];
var antNum = 1;

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
