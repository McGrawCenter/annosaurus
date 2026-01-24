
class Cropper {

  constructor(osd, callback, config = null) {
    this.osd = osd;
    this.callback = callback;
    this.active = false;
    this.crop = {};
    this.overlayOn = false;
    this.drag = {};
    this.output = {"region":[], "rotation": 0};
    this.config = {
      'cropIcon': './js/cropper/crop.svg',
      'cropIconActive': './js/cropper/crop-active.svg',
      'highlightColor': 'orange'
    }
    this.init();
  }


  toggleCrop() {
  
    var cb = document.getElementById("cropbutton");
    if(cb.classList.contains('active')) { 
      cb.classList.remove("active");
      for (var i = 0; i < cb.children.length; i++) { cb.children[i].src=this.config.cropIcon; }
      this.osd.setMouseNavEnabled(true);
      this.active = true;
    }
    else { 
     cb.classList.add("active");
     for (var i = 0; i < cb.children.length; i++) { cb.children[i].src=this.config.cropIconActive; }
     this.osd.setMouseNavEnabled(false);
     this.actve = false;
    }

  }
  
  clear() {
    if (this.overlayOn) {
        this.osd.removeOverlay("overlay");
    }
  }  
  
    handlePress(event) {
     	    console.log(this.active);
            //if(this.active == false) { return true; }
                        
                        
            if (this.overlayOn) {
                this.osd.removeOverlay("overlay");
            }
            var overlayElement = document.createElement("div");
            overlayElement.id = "overlay";
            overlayElement.className = "highlight";
            overlayElement.style.border = "thick solid "+this.config.highlightColor; 

            var viewportPos = this.osd.viewport.pointFromPixel(event.position);
            viewer.addOverlay({
                element: overlayElement,
                location: new OpenSeadragon.Rect(viewportPos.x, viewportPos.y, 0, 0)
            });
            this.overlayOn = true;
            this.drag = {
                overlayElement: overlayElement,
                startPos: viewportPos
            };
            console.log(this.drag);
	                
  }
  handleDrag(event) {

	            if (typeof this.drag === 'undefined') {
	                return;
	            }
	            
	            var viewportPos = this.osd.viewport.pointFromPixel(event.position);

	            var diffX = viewportPos.x - this.drag.startPos.x;
	            var diffY = viewportPos.y - this.drag.startPos.y;

	            var location = new OpenSeadragon.Rect(
	                Math.min(this.drag.startPos.x, this.drag.startPos.x + diffX),
	                Math.min(this.drag.startPos.y, this.drag.startPos.y + diffY),
	                Math.abs(diffX),
	                Math.abs(diffY)
	            );
	            //console.log();

	            //var overlayHeight = jQuery("#overlay")[0].clientWidth;

	            var w = this.osd.world._contentSize.x;
	            var h = this.osd.world._contentSize.y;

	            var region = [
	                Math.floor(location.x * w),
	                Math.floor(location.y * w),
	                Math.floor(location.width * w),
	                Math.floor(location.height * w)
	            ] 
	            // if the box goes outside the boundaries of the image
	                if (region[0] < 0) { region[0] = 0;  }
	                if (region[1] < 0) { region[1] = 0;  }
	                if (region[0]+region[2] > w) { region[2] = w - region[0]; }
	                if (region[1]+region[3] > h) { region[3] = h - region[1]; }
	                
	            this.output.region = region;
	            // update the box    
	            viewer.updateOverlay(this.drag.overlayElement, location);

  }
  handleDragEnd(event) {

	                if (this.overlay) {
	                    this.osd.removeOverlay("overlay");
	                }
			this.drag = null;
  			this.callback(this.output);
  			//this.osd.removeOverlay("overlay");
  			this.toggleCrop();
  
  } 

  handleRotate() {
	        this.output.rotation = viewer.viewport.getRotation();

	        if (this.output.rotation < 0) {
	            this.output.rotation = 360 + this.output.rotation;
	        }
	        if (this.output.rotation == 360) {
	            this.output.rotation = 0;
	        }
	    }
	    
    



  init() {
  
    var icon = '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-pencil-square" viewBox="0 0 50 50" version="1.1" id="crop"><path d="m 49.27243,5.2230983 c 0.647512,0.6399072 0.647512,1.6752836 0,2.3151908 L 45.800623,10.961886 39.143275,4.4032716 42.615082,0.9796751 c 0.649923,-0.64009077 1.703449,-0.64009077 2.353372,0 L 49.27243,5.219819 Z M 43.44725,13.277076 36.789902,6.7184623 14.111647,29.06366 c -0.183203,0.180447 -0.321119,0.400534 -0.40277,0.642744 l -2.679582,7.916247 c -0.215568,0.640182 0.402042,1.248632 1.051861,1.036261 l 8.035419,-2.639842 c 0.245538,-0.07949 0.468911,-0.214218 0.65242,-0.393517 L 43.44725,13.280356 Z"></path><path d="m 1,43.131887 c 3e-7,2.716667 2.2354473,4.91896 4.9930109,4.91896 H 42.608424 c 2.757564,0 4.993011,-2.202293 4.993011,-4.91896 V 23.456045 c 0,-2.186204 -1.328674,-2.186204 -1.328674,0 v 19.675842 c 0,0.905555 -2.745149,3.639653 -3.664337,3.639653 H 5.9930109 c -0.4754104,0 -1.9689322,-0.413583 -2.7888096,-1.245081 C 2.4388771,44.750288 2.3299361,43.569081 2.328674,43.131887 L 2.2227418,6.4366288 C 2.2215058,6.0084722 2.5410073,4.8870569 3.310458,4.2704304 4.1683964,3.5828912 5.508427,3.4198568 5.9930109,3.4198568 H 27.629392 c 2.219115,0 2.219115,-1.279307 0,-1.279307 H 5.9930109 C 3.2354472,2.1405498 1.0000001,4.3428434 1,7.0595102 Z"></path></svg>';
  
  
	    new OpenSeadragon.MouseTracker({
              element: this.osd.container,
              pressHandler: (event) => this.handlePress(event),
              dragHandler: (event) => this.handleDrag(event),
              dragEndHandler: (event) => this.handleDragEnd(event)
            });  
             /*    
	    this.osd.addHandler('rotate', (event) => this.handleRotate(event) );
	    console.log(this.osd);
	    var ele = document.createElement('img');
	    ele.src = "js/cropper/crop./svg";
	    var v = document.getElementById(this.osd.id).appendChild(ele);
	    */
	    //the crop button

	    var osd = this.osd;
	    var t = this;
	    let cropButton = new OpenSeadragon.Button({
		srcRest: 'js/cropper/crop.svg',
		srcGroup:  'js/cropper/crop.svg',
		srcHover:  'js/cropper/crop.svg',
		srcDown:  'js/cropper/crop-active.svg',
		tooltip: 'Crop',
		onClick: function() {
			//osd.setMouseNavEnabled(false);
			t.toggleCrop();
		    }
	     });
	     cropButton.shouldFade = false;
	     cropButton.fadeDelay = 10000;
	     OpenSeadragon.addClass(cropButton.element, "");
	     cropButton.element.id = "cropbutton";
	     this.osd.addControl(cropButton.element, { anchor: OpenSeadragon.ControlAnchor.TOP_RIGHT });
             
  }
  


}


