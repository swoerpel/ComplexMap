
var canvas;
var graphic;
var color_palettes = {};
var color_machine;
var complexMap;
var draw_index = 0;
var pause = false;

function setup() {

    reset()
}

function reset(){
    draw_index = 0;
    complexMap = new ComplexMap(
        params.function,
        params.bbox,
        params.res
    );
    setupCanvas();
    setupColors();

}

function setupCanvas(){
    canvas = createCanvas(params.canvas_width, params.canvas_height)
    canvas.parent('display')
    canvas.background('black')
    graphic = createGraphics(params.canvas_width, params.canvas_height)
}

function setupColors(){
    for (let i = 0; i < chromotome_palettes.length; i++) {
        let key = chromotome_palettes[i].name;
        color_palettes[key] = new Object(chromotome_palettes[i].colors);
    }
    color_palettes = { ...color_palettes, ...chroma.brewer };
    console.log(color_palettes)
    color_machine = chroma.scale(color_palettes[params.color.palA])

}

function draw(){
    if(!pause){
        graphic.strokeWeight(params.canvas_x_step)
        let slice = complexMap.next();
        slice.forEach((iters,index) => {
            let cv = iters.length / params.function.max_iterations
            graphic.stroke(color_machine(cv).hex())
            // iters.forEach((z)=>{
            let z=iters[0];
            let scaled_x = map(
                z.re, 
                params.bbox.x0, 
                params.bbox.x1, 
                0,
                params.canvas_width,
            )
            let scaled_y = map(
                z.im, 
                params.bbox.y0, 
                params.bbox.y1, 
                0,
                params.canvas_height,
            )
            graphic.point(scaled_x,scaled_y)
            // })

        })
        image(graphic,0,0)
    }
}

function mouseClicked(event) {

    // console.log(event.clientX)
    let scaled_x = map(event.clientX,0,params.canvas_width,params.bbox.x0,params.bbox.x1)
    let scaled_y = map(event.clientY,0,params.canvas_height,params.bbox.y0,params.bbox.y1)
    console.log(decRound(scaled_x), decRound(scaled_y))
}


var saveImage = () => {
    let imageName = 'chet000-' + iteration_count.toString()
    console.log('image name', imageName)
    save(graphic, imageName, 'png')
}

function decRound (N,acc = 1000000) {
    return Math.round(N * acc) / acc
}

function keyPressed(event){ 
    console.log(event)
    if(event.key == 'ArrowRight'){
        params.res.width++;
        params.res.height++;
        console.log(params)
        reset();
    }
    if(event.key == 'ArrowLeft'){
        params.res.width--;
        params.res.height--;
        reset();
    }
    if(event.key == ' '){
        pause = !pause;
    }
}