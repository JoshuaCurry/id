<?php

    //Grab the student ID we are checking
    $id = strval(intval($_GET['sid']));

    if(!is_numeric($id) or strlen($id)>8) {
	die("0,Dont feed me bad barcodes, , ");
    }

    $sid = $id;

    //Log file append

    $file = 'person_log.txt';
    $current = file_get_contents($file);

    //If they're not already in the log file, add them to it.
    if(strpos($current, $sid) === false) {
        $current .= $sid . "," . time() . "\n";
        file_put_contents($file, $current);
        echo "1,".$sid.","."Added to list";
    }  

    else {
        echo "1,".$sid.","."Already on list 😜";
    }


?>

