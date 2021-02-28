class Fruit2 {
    constructor(x, y) {

        var options ={
            restitution:0.4
        }
        this.r=30;
      
        this.body = Bodies.circle(x, y, this.r,options);       
        //this.color=color(random(0, 255), random(0, 255), random(0, 255))
        this.image = loadImage("Sprites/banana.png")
        this.Visiblity = 255
        World.add(world, this.body);

    }
    display() {

        var pos = this.body.position;
        var angle = this.body.angle;
       if(banana.length<3){
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0, 0, 80,70);
        pop();
    }else{
        banana.shift()
        World.remove(world, this.body);
            push();
            this.Visiblity = this.Visiblity - 0.05;
            tint(255,this.Visiblity);
            image(this.image, this.body.position.x, this.body.position.y, 30, 40);
            pop();
        }
    }
   // delete(){
   // }

};