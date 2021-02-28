class Basket{
    constructor(x,y){
        var options = {
            isStatic:false,
            restitution:0.4
        }
        
        this.x = x
        this.y = y
        this.width = 100
        this.height = 30
        this.body = Bodies.rectangle(this.x,this.y,this.width,this.height,options)
        this.color=color(random(0, 255), random(0, 255), random(0, 255));
        this.image = loadImage("Sprites/Basket.png")
        World.add(world,this.body)
    }
    display(){
        var pos = this.body.position
        push ()
        imageMode(CENTER)
        noStroke()
        fill (this.color)
        image(this.image,pos.x,pos.y,100,50)
        pop ()
    }
}