// import './cropperjs/dist/cropper.css';
var imageList=null; 



// Adding an element function
var addFile=function(){
    let image=imageList.toDataURL();
    document.getElementById('download').href=image;
    document.getElementById('download').click();
}

// function to close cropper
const closeCrop=function(Cropper){
    document.querySelector('.popup').style.animation="popup 1s 1 forwards";
    document.querySelector('.popup').style.display="none";
    document.querySelector('.cropPreview').src="./dummy.png";
    imageList=null;
    Cropper.destroy();
    Cropper=null;
}

// function for preview
function addPreview(Cropper){
    imageList=Cropper.getCroppedCanvas();
    var preview=document.querySelector('.cropPreview');
    preview.src=imageList.toDataURL();
}

// function to save new image
var cutIt=function(Cropper){
    if(imageList!==null)
        addFile();
    else{
        alert("Crop the Image First");
        closeCrop(Cropper);
    }
}


// horizontal function
var horizontal=function(Cropper){
    Cropper.setAspectRatio(2/1);
    addPreview(Cropper);
}

// vertical fucntion
var vertical=function(Cropper){
    Cropper.setAspectRatio(1/2);
    addPreview(Cropper);
}

// square function
var square=function(Cropper){
    Cropper.setAspectRatio(1);
    addPreview(Cropper);
}

// function for image cropping
var cropImage=function(){
    document.querySelector('.popup').style.display="block";
    document.querySelector('.popup').style.animation="appear 1s 1 forwards";

    var image=document.querySelector('.cropme');
    var cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode:1,
        zoomable: false,
        cropBoxResizable: true,
        toggleDragModeOnDblclick:false,
        crop(event) {
            console.log(event.detail.x);
            console.log(event.detail.y);
            console.log(event.detail.width);
            console.log(event.detail.height);
            console.log(event.detail.rotate);
            console.log(event.detail.scaleX);
            console.log(event.detail.scaleY);
        }
    });
    cropper.setCropBoxData({
        x:0,
        y:0,
        width: 100,
        height: 100
    })
    // crop image
    document.getElementById('cut').onclick=()=>addPreview(cropper);

    // download
    document.getElementById('confirmCut').onclick=()=>cutIt(cropper);

    // closing cropper
    document.querySelector('.cancel').onclick=()=>closeCrop(cropper);

    // horizontal selection
    document.getElementById('getHorizontal').onclick=()=>horizontal(cropper);

    //vertical selection
    document.getElementById('getVertical').onclick=()=>vertical(cropper);

    // square selection
    document.getElementById('getSquare').onclick=()=>square(cropper);
}



// function to get image path
var loadFile = function(event) {
    var link=document.createElement('a');
    link.className="path";
    document.querySelector('body').append(link);
    link.target="_blank";
    document.querySelector('.cropme').src=URL.createObjectURL(event.target.files[0]);
    // document.querySelector('.cropPreview').src=URL.createObjectURL(event.target.files[0]);
    cropImage();
    // document.querySelector('.uploadImage').value='';
    link.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
}
};


// '+' Add Icon Working
document.querySelector('.uploadIcon').onclick=()=>{
    document.getElementById('uploadImage').click();
}



