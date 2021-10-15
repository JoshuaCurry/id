
var lastcode;
var lasttime = 0;
var modal = 0;

function openNav() {
    document.getElementById("myNav").style.width = "100%";
    modal = 1;
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    lastcode = "";
}

$("#myNav").on('touchstart click', function() {
	closeNav();
})


$(document).ready(function() {
Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#interactive')
    },
    decoder : {
      readers : ["codabar_reader"]
    }
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });

Quagga.onDetected(function(result) {
        var code = result.codeResult.code;
	console.log("scan");
	if(code!=lastcode && ($.now()-lasttime)>2000) {
		lasttime = $.now();
		console.log("new");
		sid = code.substr(2).slice(0, -1);
		console.log(sid);

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		        var out = xhttp.responseText;
				console.log(out);
				var res = out.split(",");
				var status = parseInt(res[0]);
				if(status==1) {
					document.getElementById("p1").innerHTML = "<b>VALID</b>"; 
					document.getElementById("p2").innerHTML = res[1];
					document.getElementById("p3").innerHTML = ""; 
					document.getElementById("p4").innerHTML = res[2];
					document.getElementById("myNav").style.backgroundColor = "purple";
				}
				else if(status==0){
					document.getElementById("p1").innerHTML  = "<b>INVALID</b>";
					document.getElementById("p2").innerHTML = res[1];
					document.getElementById("p3").innerHTML = "<b>"+res[3]+"</b>";
					document.getElementById("p4").innerHTML = res[2];

					document.getElementById("myNav").style.backgroundColor = "red";
				}
		    }
		};
		xhttp.open("GET", "check.php?sid="+sid, true);
		xhttp.send();
		openNav();
        document.getElementById("p1").innerHTML  = "Checking";
		document.getElementById("p2").innerHTML = "Please Wait...";
        document.getElementById("p3").innerHTML = "";
        document.getElementById("p4").innerHTML = "";
	    document.getElementById("myNav").style.backgroundColor = "black";

	lastcode = code;
	}

    });
	
});
