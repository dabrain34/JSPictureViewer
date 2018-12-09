JSPV_N_COLS = 6
function JSPVgenerateMosaic (workspace, images, start, stop) {
    viewport_width = workspace.clientWidth;
    viewport_height = window.innerHeight - 450;
    workspace.innerHTML = '';
    images_loaded = 1;
    pic_width = viewport_width/JSPV_N_COLS;
    pic_height = pic_width * 3 / 4; //AR = 4/3
    images_removed = [];
    all_images = images;
    for(var i=start; i < stop; i++) {
        console.log("Entering image insertion loop");
        elem = document.createElement('div');
        elem.setAttribute("id", "div" + i);
        elem.setAttribute("class", "photo");
        aTag = document.createElement('a');
        aTag.setAttribute('class',"searchlight");
        if(images[i]['link'] === undefined)
            aTag.setAttribute('href',"#divBig" + i);
        else
            aTag.setAttribute('href',images[i]['link']);
        elem.appendChild(aTag);
        workspace.appendChild(elem);
        elemBig = document.createElement('div');
        elemBig.setAttribute("class", "searchlight-target");
        elemBig.setAttribute("id", "divBig" + i);
        aTag = document.createElement('a');
        aTag.setAttribute("class", "searchlight-close");
        aTag.setAttribute('href',"#");
        aImg = document.createElement('img');
        aImg.setAttribute("src", images[i]["url"]);
        elemBig.appendChild(aImg);
        elemBig.appendChild(aTag);
        workspace.appendChild(elemBig);
        img = new Image();
        img.src = images[i]["url"];
        img.div = elem
        img.onload = function(){
            ar = this.width / this.height;
            elem = this.div;
            elem.style.backgroundImage = "url(" + this.src + ")";
            if(ar>1) {
              elem.style.width = parseInt(pic_width)+"px";
              elem.style.height = parseInt(pic_height)+"px";
              elem.style.backgroundSize = "contain";
              elem.style.backgroundColor = "transparent";
            } else {
                workspace.removeChild(elem);
              elem.style.width = parseInt(pic_width/2)+"px";
              elem.style.height = parseInt(pic_width*ar)+"px";
              images_removed.push(elem);
            }
            images_loaded += 1;
            console.log("images_loaded=" + images_loaded + "total_images=" + total_images);
            if(images_loaded >= total_images) {
                child_position = 2;
                for (var j=0; j < images_removed.length - 1; j ++) {
                    workspace.insertBefore(images_removed[j++], workspace.children[child_position]);
                    workspace.insertBefore(images_removed[j], workspace.children[child_position]);
                    child_position += (5 + j);
                }
                //for(j=0;j<N_COLS;j++) {
                    //elem = document.createElement('div');
                    //elem.setAttribute("class", "photo_nonclicable");
                    //elem.style.width = parseInt(pic_width)+"px";
                    //elem.style.height = parseInt(pic_width/ar)+"px";
                    //WORKSPACE.appendChild(elem);
                //}
            }
        }
        img.onerror = function(){
            console.log("unable to load " + this.src);
            workspace.removeChild(this.div);
            total_images -=1;
        }
    }
}