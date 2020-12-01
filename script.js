// import './cropperjs/dist/cropper.css';
var imageList; 

// Adding an element function
var addFile=function(){
    let image=imageList.toDataURL();
    document.getElementById('download').href=image;
    document.getElementById('download').click();
}

const closeCrop=function(Cropper){
    document.querySelector('.popup').style.animation="popup 1s 1 forwards";
    document.querySelector('.popup').style.display="none";
    Cropper.destroy();
    Cropper=null;
}

// function to save new image
var cutIt=function(Cropper){
    imageList=Cropper.getCroppedCanvas();
    closeCrop(Cropper);
    addFile();

}

// function for image cropping
var cropImage=function(){
    document.querySelector('.popup').style.display="block";
    document.querySelector('.popup').style.animation="appear 1s 1 forwards";

    var image=document.querySelector('.cropme');
    var cropper = new Cropper(image, {
        aspectRatio: 1/1,
        data:{
            width:500,
            height: 500
        },
        crop(event){
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
        width: 320,
        height: 200
    })
    // save crop
    document.getElementById('cut').onclick=()=>cutIt(cropper);

    // closing cropper
    document.querySelector('.close').onclick=()=>closeCrop(cropper);
}



// function to get image path
var loadFile = function(event) {
    var link=document.createElement('a');
    link.className="path";
    document.querySelector('body').append(link);
    link.target="_blank";
    imageList=URL.createObjectURL(event.target.files[0]);
    document.querySelector('.cropme').src=URL.createObjectURL(event.target.files[0]);
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



