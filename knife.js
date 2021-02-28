class Knife{
    constructor(x, y) {
        
        var options ={
            restitution:0.4,
            density:1,
            
        }
        this.r=10;
      
        this.body = Bodies.circle(x, y, this.r,options);       
        this.image = loadImage("Sprites/knife.png")
        World.add(world, this.body);

    }
    display() {

        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        imageMode(CENTER);
        image(this.image,0, 0, this.r,50);
        pop();
    }
}