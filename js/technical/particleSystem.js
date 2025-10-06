var particles = {};
var particleID = 0;
var mouseX = 0;
var mouseY = 0;

function makeParticles(data, amount=1, type = "normal", extra = {}) {
    for (let x = 0; x < amount; x++) {
        let particle = newParticles[type]()
        for (thing in data) {
            switch(thing) {
                case 'onClick': // Functions that should be copied over
                case 'onMouseEnter':
                case 'onMouseLeave':
                case 'update':
                    particle[thing] = data[thing]
                    break;
                default:
                    particle[thing]=run(data[thing], data, x)
                    
            }
        }
        for (thing in extra) {
            particle[thing] = run(extra[thing], extra, x)
        }
        if (data.dir === undefined) {
            particle.dir = particle.angle
        }
        particle.dir = particle.dir + (particle.spread * (x- amount/2 + 0.5))

        if(particle.offset) {
            particle.x += particle.offset * sin(particle.dir)
            particle.y += particle.offset * cos(particle.dir) * -1
        }

        particle.xVel = particle.speed * sin(particle.dir)
        particle.yVel = particle.speed * cos(particle.dir) * -1
        particle.fadeInTimer = particle.fadeInTime
	    Vue.set(particles, particle.id, particle)

    }
}

// Makes a particle at a random location that stays still until it despawns
function makeShinies(data, amount=1, extra = {}) {
    makeParticles(data, amount, "shiny", extra)
}


function updateParticles(diff) {
	for (p in particles) {
        let particle = particles[p]
		particle.time -= diff;
        particle.fadeInTimer -= diff;
		if (particle["time"] < 0) {
			Vue.delete(particles, p); 
            
		}
        else {
            if (particle.update) run(particle.update, particle)
            particle.angle += particle.rotation
            particle.x += particle.xVel
            particle.y += particle.yVel
            particle.speed = Math.sqrt(Math.pow(particle.xVel, 2) + Math.pow(particle.yVel, 2))
            particle.dir = atan(-particle.xVel/particle.yVel)
            particle.yVel += particle.gravity
        }
	}
}

function setDir(particle, dir) {
    particle.dir = dir
    particle.xVel = particle.speed * sin(particle.dir)
    particle.yVel = particle.speed * cos(particle.dir) * -1
}

function setSpeed(particle, speed) {
    particle.speed = speed
    particle.xVel = particle.speed * sin(particle.dir)
    particle.yVel = particle.speed * cos(particle.dir) * -1
}

const newParticles = {
    normal() {
        particleID++
        return {
            time: 3,
            id: particleID,
            x: mouseX,
            y: mouseY,
            width: 35,
            height: 35,
            image: "resources/genericParticle.png",
            angle: 0,
            spread: 30,
            offset: 10,
            speed: 15,
            xVel: 0,
            yVel: 0,
            rotation: 0,
            gravity: 0,
            fadeOutTime: 1,
            fadeInTimer: 0,
            fadeInTime: 0,
        }
    },
    shiny() {
        particleID++
        return {
            time: 10,
            id: particleID,
            x: Math.random() * (tmp.other.screenWidth*0.8) + tmp.other.screenWidth*0.13,
            y: Math.random() * (tmp.other.screenHeight*0.8) + tmp.other.screenHeight*0.2,
            width: 50,
            height: 50,
            image: "resources/genericParticle.png",
            angle: 0,
            spread: 0,
            offset: 0,
            speed: 0,
            xVel: 0,
            yVel: 0,
            rotation: 0,
            gravity: 0,
            fadeOutTime: 1,
            fadeInTimer: 0,
            fadeInTime: 0.5,
        }
    },
}



function updateMouse(event) {
    mouseX = event.clientX
    mouseY = event.clientY
}

function getOpacity(particle) {
    if ((particle.time < particle.fadeOutTime) && particle.fadeOutTime)
        return particle.time / particle.fadeOutTime
    if (particle.fadeInTimer > 0) 
        return 1 - (particle.fadeInTimer / particle.fadeInTime)
    
    return 1
}   

function constructParticleStyle(particle){
    let style =  {
        left: (particle.x  - particle.height/2) + 'px',
        top: (particle.y - particle.height/2) + 'px',
        width: particle.width + 'px',
        height: particle.height + 'px',
        transform: "rotate(" + particle.angle + "deg)",
        opacity: getOpacity(particle),
        "pointer-events": (particle.onClick || particle.onHover) ? 'auto' : 'none',
    }
    if (particle.color) {
        style["background-color"] = particle.color
        style.mask = "url(#pmask" + particle.id + ")"
        style["-webkit-mask-box-image"] = "url(" + particle.image + ")"
    }
    else 
        style["background-image"] = "url(" + particle.image + ")"
    return style
}

function clearParticles(check) {
    if (!check) check = true

    for (p in particles) {
        if (run(check, particles[p], particles[p])){
            Vue.delete(particles, p)
        }
    }
}

// Trig with degrees
function sin(x) { return Math.sin(x*Math.PI/180)}

function cos(x) {return Math.cos(x*Math.PI/180)}

function tan(x) {return Math.tan(x*Math.PI/180)}

function asin(x) { return Math.asin(x)*180/Math.PI}

function acos(x) { return Math.acos(x)*180/Math.PI}

function atan(x) { return Math.atan(x)*180/Math.PI}
