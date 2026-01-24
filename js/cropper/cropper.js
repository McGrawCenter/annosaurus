
class Cropper {

  constructor(osd, callback) {
    this.osd = osd;
    this.callback = callback;
    this.active = false;
    this.crop = {};
    this.overlayOn = false;
    this.drag = {};
    this.output = {"region":[], "rotation": 0};
    this.init();
  }


  activate() {
    this.osd.setMouseNavEnabled(false);
    console.log("cropper activated");
  }
  
  
    handlePress(event) {
            console.log(this.active);
    	    if(this.active == true) { console.log('not enabled');this.osd.setMouseNavEnabled(false); }
    /*
    	    if(this.active == false) {
    	    console.log("do");
    	          return true;
    	    }
    	    else {
    	      console.log("here");
    	      this.osd.setMouseNavEnabled(false);
    	    }
   */
            if (this.overlayOn) {
                this.osd.removeOverlay("overlay");
            }
            var overlayElement = document.createElement("div");
            overlayElement.id = "overlay";
            overlayElement.className = "highlight";

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


                	//viewer.setMouseNavEnabled(true);
	                if (this.overlay) {
	                    this.osd.removeOverlay("overlay");
	                }
			this.drag = null;  
  			this.callback(this.output);
  			this.osd.removeOverlay("overlay");
  			this.osd.setMouseNavEnabled(true); 
  
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
	    
  handleButton() {
  
  }	    



  init() {
	    new OpenSeadragon.MouseTracker({
              element: this.osd.container,
              pressHandler: (event) => this.handlePress(event),
              dragHandler: (event) => this.handleDrag(event),
              dragEndHandler: (event) => this.handleDragEnd(event)
            });  
                 
	    this.osd.addHandler('rotate', (event) => this.handleRotate(event) );
	    
	    //the crop button
	    var osd = this.osd;
	    let cropButton = new OpenSeadragon.Button({
		srcRest: `<svg
   version="1.1"
   width="50"
   height="50"
   id="svg6"
   sodipodi:docname="crop.svg"
   inkscape:version="1.2.2 (b0a8486541, 2022-12-01)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs10" />
  <sodipodi:namedview
     id="namedview8"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     showgrid="false"
     inkscape:zoom="9.44"
     inkscape:cx="16.472458"
     inkscape:cy="35.646186"
     inkscape:window-width="1854"
     inkscape:window-height="1131"
     inkscape:window-x="66"
     inkscape:window-y="32"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg6" />
  <rect
     style="fill:#000000;fill-opacity:0.527977;stroke-width:0.99078"
     id="rect397"
     width="49.969555"
     height="49.764847"
     x="0.10136747"
     y="0.19418749"
     inkscape:label="rect397" />
  <path
     d="m 28.320202,11.729841 -0.245386,28.341272 a 3.7751653,3.7788364 0 0 0 3.775166,3.778837 h 28.313739"
     id="path995-3"
     style="stroke-width:3.777;fill:none" />
  <path
     d="M 11.231761,5.1763061 10.986375,33.517579 a 3.7751653,3.7788364 0 0 0 3.775166,3.778837 H 43.07528"
     id="path995"
     style="stroke-width:4.677;fill:none;stroke-dasharray:none" />
  <g
     id="g25277"
     transform="translate(6.932841,3.9263879)">
    <path
       style="fill:#ffffff;fill-opacity:0.527977;stroke:#ffffff;stroke-width:2.277;stroke-linecap:round;stroke-dasharray:none;stroke-opacity:1"
       d="m 8.4396686,5.8120501 c 0,24.8887369 -0.072137,24.6033199 -0.072137,24.6033199"
       id="path25246" />
    <path
       style="fill:#ffffff;fill-opacity:0.527977;stroke:#ffffff;stroke-width:2.277;stroke-linecap:round;stroke-dasharray:none;stroke-opacity:1"
       d="m 8.3835785,30.384883 c 24.8887365,0 24.6033195,0.07214 24.6033195,0.07214"
       id="path25246-5" />
  </g>
  <g
     id="g25277-6"
     transform="rotate(180,21.528838,22.812319)">
    <path
       style="fill:#ffffff;fill-opacity:0.527977;stroke:#ffffff;stroke-width:2.277;stroke-linecap:round;stroke-dasharray:none;stroke-opacity:1"
       d="m 8.4396686,5.8120501 c 0,24.8887369 -0.072137,24.6033199 -0.072137,24.6033199"
       id="path25246-2" />
    <path
       style="fill:#ffffff;fill-opacity:0.527977;stroke:#ffffff;stroke-width:2.277;stroke-linecap:round;stroke-dasharray:none;stroke-opacity:1"
       d="m 8.3835785,30.384883 c 24.8887365,0 24.6033195,0.07214 24.6033195,0.07214"
       id="path25246-5-9" />
  </g>
</svg>`,
		tooltip: 'Crop',
		onClick: function() {
			osd.setMouseNavEnabled(false);
		    }
	     });
	     OpenSeadragon.addClass(cropButton.element, "cropbutton");
	     this.osd.addControl(cropButton.element, { anchor: OpenSeadragon.ControlAnchor.TOP_RIGHT });	               
  }
  


}


