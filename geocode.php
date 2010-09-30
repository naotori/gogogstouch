<?php
	//	http://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/geocoder.html
	echo file_get_contents('http://geo.search.olp.yahooapis.jp/OpenLocalPlatform/V1/geoCoder?output=json&appid=[自分のIDを入れてください]&'.$_SERVER["QUERY_STRING"]);
?>
