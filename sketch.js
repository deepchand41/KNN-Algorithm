
var data = [];
var neighbors = [];
var label;

var countA = 0;
var countB = 0;


var submitFlag = false;
var testFlag = false;
var linne = false;

var testDataX = 0;
var testDataY = 0;

var k = 5;

var kParagraph;

function setup(){
	createCanvas(400, 400);	

	kParagraph = createP();

	var dropDown = createSelect('');
	dropDown.option('A');
	dropDown.option('B');

	label = dropDown.value();

	var button = createButton('change');
	button.mousePressed(labelValueChange);

	function labelValueChange(){
		label = dropDown.value();
	}



	var testX = createSelect('');
	testX.option('100');
	testX.option('125');
	testX.option('150');
	testX.option('200');
	testX.option('225');
	testX.option('250');
	testX.option('300');
	testX.option('325');
	testX.option('350');
	testX.option('400');
	var testY = createSelect('');
	testY.option('100');
	testY.option('125');
	testY.option('200');
	testY.option('225');
	testY.option('300');
	testY.option('325');
	testY.option('350');
	testY.option('400');

	var testButton = createButton('submit');
	testButton.mousePressed(assignTestData);

	function assignTestData(){

		testDataX = testX.value();
		testDataY = testY.value();

		testDataX = map(testDataX, 0, width, 0, 1);
		testDataY = map(testDataY, 0, height, 1, 0);
	
		submitFlag = true;

	}


	Kslider = createSlider(0, 10, 5, 1);
  	//Kslider.position(10, 10);
  	Kslider.style('width', '80px');
	
	k = Kslider.value();
  	kParagraph.html('k: ' + k);

	var Eucledian = createButton('compute');
	Eucledian.mousePressed(EuclideanDistance);

	function EuclideanDistance(){
			for(var i = 0; i < data.length; i++){

			var d = dist(testDataX, testDataY, data[i].x, data[i].y);


			neighbors.push({
				dist: d,
				x: data[i].x,
				y: data[i].y,
				label: data[i].label
			});
		}

		neighbors.sort(byDistance);


		function byDistance(a,b){
			return a.dist - b.dist;
		}
		linne = true;

		for(var i = 0; i < k; i++){
			if(neighbors[i].label == 'A'){
				countA++;
			}
			else if(neighbors[i].label == 'B'){
				countB++;
			}
		}

		if(countA > countB){
			createP("Label is A");
		}
		else if (countB > countA){
			createP("Label is B");
		}
		else if(countA == countB){
			createP("Equal labelling");
		}
		
	}
	


}




	function mousePressed(){

		var x = map(mouseX, 0, width, 0, 1);
		var y = map(mouseY, 0, height, 1, 0);

		var point = {
			x: x,
			y: y,
			label: label
		};
		data.push(point);
		
	}



	

function draw(){
	background(220);

			for(var i = 0; i < data.length; i++){
			var x = map(data[i].x, 0, 1, 0, width);
			var y = map(data[i].y, 0, 1, height, 0);
			
			if(data[i].label == 'A'){
				fill(255);
				stroke(255);
				ellipse(x, y, 10, 10);
			}
			else if(data[i].label == 'B'){
				fill(0,255,0);
				stroke(255);
				ellipse(x, y, 10, 10);
			}
		}


		if(submitFlag){

			var x = map(testDataX, 0, 1, 0, width);
			var y = map(testDataY, 0, 1, height, 0);

			fill(255,0,0);
			stroke(255);
			ellipse(x, y, 10, 10);

		}

		if(linne){
				var x = map(testDataX, 0, 1, 0, width);
				var y = map(testDataY, 0, 1, height, 0);

				for(var i = 0; i < k; i++){
					var x2 = map(neighbors[i].x, 0, 1, 0, width);
					var y2 = map(neighbors[i].y, 0, 1, height, 0);
					stroke(255,150,190);
					line(x, y, x2, y2);
			}
		}
		
	
}

