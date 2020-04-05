



class ComplexMap {
    constructor(function_params,bbox,res) {
        this.function_params = function_params
        this.bbox = {...bbox};
        this.res = res;
        this.initComplexMap()
    }

    initComplexMap(){
        this.bbox_width = Math.round((this.bbox.x1 - this.bbox.x0) / this.bbox.x_step);
        this.bbox_height = Math.round((this.bbox.y1 - this.bbox.y0) / this.bbox.y_step);
        this.x_index = 0;
        this.complexMap = []
        for(let x = this.bbox.x0; x <= this.bbox.x1+this.bbox.x_step; x+=this.bbox.x_step){
            for(let y = this.bbox.y0; y <= this.bbox.y1+this.bbox.y_step; y+=this.bbox.y_step){
                this.complexMap.push({
                    z: math.complex(this.round(x),this.round(y)),
                });
            }
        }
        // this.complexMap.forEach((point) => console.log(point.z.re, point.z.im))
        console.log(this.complexMap)
    }

    mandelbrot(Zn,C){
        let iters = [];
        let n = 0;
        while (n < this.function_params.max_iterations) {
            let Zn2 = math.multiply(Zn,Zn)
            Zn = math.add(Zn2, C)
            if (Math.abs(Zn.re) > this.function_params.divergence ||
                Math.abs(Zn.im) > this.function_params.divergence) {
                n = this.function_params.max_iterations;
            }
            iters.push(Zn)
            n++;
        }
        return iters;
    }

    burning_ship(Zn,C){
        let iters = [];
        let n = 0;
        while (n < this.function_params.max_iterations) {
            let absZn = math.complex(Math.abs(Zn.re),Math.abs(Zn.im))
            let Zn2 = math.multiply(absZn,absZn)
            Zn = math.add(Zn2, C)
            if (Math.abs(Zn.re) > this.function_params.divergence ||
                Math.abs(Zn.im) > this.function_params.divergence) {
                n = this.function_params.max_iterations;
            }
            iters.push(Zn)
            n++;
        }
        return iters;   
    }

    julia(Zn){
        let iters = [];
        let n = 0;
        let C = math.complex(this.function_params.z0.re,this.function_params.z0.im)
        while (n < this.function_params.max_iterations) {
            let Zn2 = math.multiply(Zn,Zn)
            Zn = math.add(C,Zn2)
            let r = Math.sqrt(Math.pow(Math.abs(Zn.re),2) + Math.pow(Math.abs(Zn.re),2))
            if (r > this.function_params.divergence){
                n = this.function_params.max_iterations;
            }
            iters.push(Zn)
            n++;
        }
        // console.log(JSON.stringify(iters))
        return iters;
    }

    next(){
        let slice = [];
        // console.log(JSON.stringify(this.complexMap))
        console.log(this.x_index)
        for(let i = this.x_index; i < this.x_index + this.bbox_height + 1; i++){
            console.log(this.complexMap[i])
            if(this.complexMap[i]){

                if(this.function_params.name == 'mandelbrot'){
                    let C = this.complexMap[i].z
                    let Zn = math.complex(0,0)
                    slice.push(this.mandelbrot(Zn,C))
                }else if(this.function_params.name == 'burning-ship'){
                    let C = this.complexMap[i].z
                    let Zn = math.complex(0,0)
                    slice.push(this.burning_ship(Zn,C))
                }else if(this.function_params.name == 'julia'){
                    let Zn = this.complexMap[i].z
                    slice.push(this.julia(Zn))
                }
            }else{
                break;
            }
        }
        this.x_index += this.bbox_height + 1;
        // console.log('slice',slice)
        return slice;
    }

    round(N,acc = 1000000){
        return Math.round(N * acc) / acc
    }
}