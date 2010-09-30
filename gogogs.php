<?php
	// http://api.gogo.gs/
  header("Content-Type: text/xml");
  echo file_get_contents('http://api.gogo.gs/v1.2/?apid=[自分のIDを入れてください]&'.$_SERVER["QUERY_STRING"]);
?>
