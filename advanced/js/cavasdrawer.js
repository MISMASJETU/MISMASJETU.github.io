    const canvas = document.getElementById("CD_canvas");
    const ctx = canvas.getContext("2d");
    const CD_testsubmit = document.querySelector(".CD_clear");
    const CD_color = document.querySelector(".CD_color");
    const CD_tool = document.querySelector(".CD_tool");
    const CD_alpha = document.querySelector(".CD_alpha");
    const CD_slider = document.querySelector(".CD_slider");
    const CD_save = document.querySelector(".CD_save");
    const CD_load = document.querySelector(".CD_load");
    const CD_savename = document.querySelector(".CD_savename");
    const CD_saves = document.querySelector(".CD_saves");
    canvas.width = 1000;
    canvas.height = 600;
    let sizeWidth = ctx.canvas.clientWidth;
    let sizeHeight = ctx.canvas.clientHeight;
    let scaleWidth = sizeWidth/100;
    let scaleHeight = sizeHeight/100;
    let mode = 10;
    let pathStart;
    let alpha = 100;
    clear();
    function clear(){
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, sizeWidth, sizeHeight);
    }

    CD_testsubmit.addEventListener('click', clear);

    function getTool(){
        switch(CD_tool.value){
            case 'line':
                mode = 0;
                break;
            case 'fixedline':
                mode = 2;
                break;
            case 'rectangle':
                mode = 4;
                break;
            case 'circle':
                mode = 6;
                break;
            case 'fillcircle':
                mode = 8;
                break;
            case 'brush':
                mode = 10;
                break;
            case 'air brush':
                mode = 12;
                break;
            case 'erase':
                mode = 99;
                break;
        }
    }

    function getAlpha(){
        alpha = CD_alpha.value;
    }

    function pathDraw(x, y){
        if(mode == 0){
            pathStart = [x,y];
            mode = 1;
        } else if (mode == 1){
            ctx.beginPath();
            ctx.lineWidth = CD_slider.value;
            ctx.strokeStyle = CD_color.value;
            ctx.moveTo(pathStart[0], pathStart[1]);
            ctx.lineTo(x, y);
            ctx.stroke();
            mode = 0;
        }
    }

    function fixedDraw(x, y){
        if(mode == 2){
            pathStart = [x,y];
            mode = 3;
        } else if (mode == 3){
            ctx.beginPath();
            ctx.lineWidth = CD_slider.value;
            ctx.strokeStyle = CD_color.value;
            if(Math.abs(x - pathStart[0]) > Math.abs(y - pathStart[1])){
                ctx.moveTo(pathStart[0], pathStart[1]);
                ctx.lineTo(x, pathStart[1]);
            } else {
                ctx.moveTo(pathStart[0], pathStart[1]);
                ctx.lineTo(pathStart[0], y);
            }
            
            ctx.stroke();
            mode = 2;
        }
    }

    function rectDraw(x, y){
        if(mode == 4){
            pathStart = [x,y];
            mode = 5;
        } else if (mode == 5){
            let rx;
            let ry;
            let rw;
            let rh;
            if(x < pathStart[0]){
                rx = x;
                rw = pathStart[0] - x;
            } else{
                rx = pathStart[0];
                rw = x - pathStart[0];
            }
            if(y < pathStart[1]){
                ry = y;
                rh = pathStart[1] - y;
            } else{
                ry = pathStart[1];
                rh = y - pathStart[1];
            }
            ctx.fillStyle = CD_color.value;
            ctx.fillRect(rx, ry, rw, rh);
            mode = 4;
        }
    }

    function circleDraw(x, y){
        if(mode == 6){
            pathStart = [x,y];
            mode = 7;
        } else if (mode == 7){
            ctx.beginPath();
            ctx.lineWidth = CD_slider.value;
            ctx.strokeStyle = CD_color.value;
            let radiusx = Math.abs(x - pathStart[0]);
            let radiusy = Math.abs(y - pathStart[1]);
            let radius = Math.sqrt((radiusx * radiusx) + (radiusy * radiusy));
            ctx.arc(pathStart[0],pathStart[1], radius, 0, 2 * Math.PI);
            //ctx.fillStyle = CD_color.value;
            //ctx.fill();
            ctx.stroke();
            mode = 6;
        }
    }

    function fillCircleDraw(x, y){
        if(mode == 8){
            pathStart = [x,y];
            mode = 9;
        } else if (mode == 9){
            ctx.beginPath();
            ctx.lineWidth = CD_slider.value;
            ctx.strokeStyle = CD_color.value;
            let radiusx = Math.abs(x - pathStart[0]);
            let radiusy = Math.abs(y - pathStart[1]);
            let radius = Math.sqrt((radiusx * radiusx) + (radiusy * radiusy));
            ctx.arc(pathStart[0],pathStart[1], radius, 0, 2 * Math.PI);
            ctx.fillStyle = CD_color.value;
            ctx.fill();
            ctx.stroke();
            mode = 8;
        }
    }

    function erase(x, y){
        ctx.beginPath();
        ctx.lineWidth = CD_slider.value;
        ctx.strokeStyle = "white";
        ctx.arc(x,y, CD_slider.value, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();
    }

    function brushDraw(x, y){
        if(mode == 10){
            mode = 11;
            console.log(1);
            while(mode == 11){
                console.log(2);
        ctx.beginPath();
        ctx.lineWidth = CD_slider.value;
        ctx.strokeStyle = CD_color.value;
        ctx.arc(x,y, CD_slider.value, 0, 2 * Math.PI);
        ctx.fillStyle = CD_color.value;
        ctx.fill();
        ctx.stroke();
            }
        } else {
            mode = 10;
        }
    }

    const getCursorPosition = (canvas, event) => { //https://blog.devgenius.io/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element-d5dc288c19e8
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        getAlpha();
        ctx.globalAlpha = alpha / 100;
        if(mode == 0 || mode == 2 || mode == 4 || mode == 6 || mode == 8){
            operationSave();
        }
        if(mode == 0 || mode == 1){
            pathDraw(x, y);
        }
        if(mode == 2 || mode == 3){
            fixedDraw(x, y);
        }
        if(mode == 4 || mode == 5){
            rectDraw(x, y);
        }
        if(mode == 6 || mode == 7){
            circleDraw(x, y);
        }
        if(mode == 8 || mode == 9){
            fillCircleDraw(x, y);
        }
        //if(mode == 10 || mode == 11){
        //    brushDraw(x, y);
        //}
        if(mode == 99){
            erase(x, y);
        }
    }
    var mousePressed = false;

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    canvas.onmousedown = function(e) {
        if(mode == 10){
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mousePressed = true;
        pathStart = [x,y];
        //delay(10).then(() => continueBrush());
        }
    };

    canvas.onmouseup = function(e) {
        if(mode == 10){
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mousePressed = false;
        
        ctx.beginPath();
        ctx.lineWidth = CD_slider.value;
        ctx.strokeStyle = CD_color.value;
        ctx.moveTo(pathStart[0], pathStart[1]);
        ctx.lineTo(x, y);
        ctx.stroke();
        }
    };

    function continueBrush(e){
        if(mousePressed && mode == 10){
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ctx.beginPath();
            ctx.lineWidth = CD_slider.value;
            ctx.strokeStyle = CD_color.value;
            ctx.moveTo(pathStart[0], pathStart[1]);
            ctx.lineTo(x, y);
            ctx.stroke();
            pathStart = [x,y];
            //delay(10).then(() => continueBrush());
        }
    }


    function airBrushStart(){
        if(mode == 12){
            mode = 13;
        }
    }

    function airBrush(e){
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        for(let i = 0; i < CD_slider.value * 2; i++){
            const size = 10;
            let tmpRandom = Math.random();
            let tmpx = Math.cos(6.28 * tmpRandom) * CD_slider.value * size;
            let tmpy = Math.sin(6.28 * tmpRandom) * CD_slider.value * size;
            tmpx += x;
            tmpy += y;
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = CD_color.value;
            ctx.arc(tmpx,tmpy, 1  , 0, 2 * Math.PI);
            ctx.fillStyle = CD_color.value;
            ctx.fill();
            ctx.stroke();
        }
        
    }

    function airBrushEnd(){
        mode = 12;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    canvas.addEventListener('mousedown', (e) => {
        getCursorPosition(canvas, e)
        airBrushStart();
    })

    canvas.addEventListener('mousemove', (e) => {
        continueBrush(e);
        operationPreview(e);
        if(mode == 13){
            airBrush(e);
        }
    })

    canvas.addEventListener('mouseup', (e) => { 
        if(mode == 13){
            airBrushEnd();
        }
    })

    function operationPreview(e){
        //operationLoad();
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        getAlpha();
        ctx.globalAlpha = alpha / 100;
        if(mode == 1){
            operationLoad();
            pathDraw(x, y);
            mode = 1;
        }
        if(mode == 3){
            operationLoad();
            fixedDraw(x, y);
            mode = 3;
        }
        if(mode == 5){
            operationLoad();
            rectDraw(x, y);
            mode = 5;
        }
        if(mode == 7){
            operationLoad();
            circleDraw(x, y);
            mode = 7;
        }
        if(mode == 9){
            operationLoad();
            fillCircleDraw(x, y);
            mode = 9;
        }
        
    }

    CD_tool.addEventListener('input', getTool);

    CD_save.addEventListener('click', save);

    CD_load.addEventListener('click', load);

    function cd_save(data, name) {
        this.data = data;
        this.name = name;
    }
    let imageData = [];
    let operationData = ctx.getImageData(0, 0, sizeWidth, sizeHeight);

    function save(){
        imageData.push(new cd_save(ctx.getImageData(0, 0, sizeWidth, sizeHeight), CD_savename.value));
        saveRefresh();
    }

    function load(){
        clear();
        let tmpName = CD_saves.value;
        
        for(let i = 0; i < imageData.length; i++){
            if(tmpName == imageData[i].name){
                ctx.putImageData(imageData[i].data, 0, 0);
            }
        }
    }

    function saveRefresh(){
        CD_saves.innerHTML = '';
        for(let i = 0; i < imageData.length; i++){
            CD_saves.innerHTML += '<option value="' + imageData[i].name + '">' + imageData[i].name  + '</option>';
        }
    }

    function operationSave(){
        operationData = ctx.getImageData(0, 0, sizeWidth, sizeHeight);
    }

    function operationLoad(){
        clear();
        ctx.putImageData(operationData, 0, 0);
    }