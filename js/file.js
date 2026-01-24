jQuery(document).ready(function(){

	var file = "";
	var items = [];

	jQuery("#import").click(function(){
	  var input = document.createElement('input');
	  input.type = 'file';
	  input.onchange = e => { 
	     file = e.target.files[0]; 
	     // setting up the reader
	     var reader = new FileReader();
	     reader.readAsText(file,'UTF-8');

	     // here we tell the reader what to do when it's done reading...
	     reader.onload = readerEvent => {
		var content = JSON.parse(readerEvent.target.result);
		
		var manifestArr = [];
		
		content.forEach((anno)=>{

		  crops[anno.id] = anno;
		  var manifest = anno.target.source.partOf.source;
		  if(!manifestArr.includes(manifest)) { manifestArr.push(manifest); }

		  var image = anno.body[1].id;
		  
		  addCard(anno.id, "gallery-right-slider", image, anno.body[0].value, 'right');

		  		  
		});
		
		//drawCrops();
		
		
		manifestArr.forEach((manifest)=>{
		  loadManifest(manifest);
		});

	     }     
	  }
	  input.click();
	});


	jQuery("#export").click(function(){

	  var exportArr = [];
	  for(x in crops) { exportArr.push(crops[x]); }

	  var finalName = "annotations";

	  // Convert to JSON string
	  const manifestJson = JSON.stringify(exportArr, null, 2);

	  // Create blob and download
	  const blob = new Blob([manifestJson], { type: 'application/json' });
	  const url = URL.createObjectURL(blob);
	  const a = document.createElement('a');
	  a.href = url;
	  a.download = `${finalName}.json`;
	  document.body.appendChild(a);
	  a.click();
	  document.body.removeChild(a);
	  URL.revokeObjectURL(url);
	  alert(`Manifest "${finalName}" has been exported successfully!`);

	});
	
	
	


});
