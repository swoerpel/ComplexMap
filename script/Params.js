var params = {
    horizontal_padding :0,
    vertical_padding:0,
    canvas_width: 4800,
    canvas_height: 4800,
    res: {
        width: 5,
        height: 0
    },
    bbox : {
        x0: -1.7806,
        x1:-1.761162,
        y0: -0.04,
        y1: -0.033,
    },
    function:{
        name: 'burning-ship',
        divergence: 25,
        max_iterations: 40,
        z0:{
            re:0.285,
            im:0 
        }
    },
    color: {
        palA: 'spectral',
        palB: ''
    },
}

params.res.height = params.res.width
params.bbox.x_step = decRound((params.bbox.x1 - params.bbox.x0) / params.res.width)
params.bbox.y_step = decRound((params.bbox.y1 - params.bbox.y0) / params.res.height)
params.canvas_x_step = params.canvas_width / params.res.width
params.canvas_y_step = params.canvas_height / params.res.height