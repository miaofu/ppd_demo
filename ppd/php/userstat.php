<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");




$conn = new mysqli("localhost", "root", "1234", "ppd_demo");
if (!$conn)
  {
  die('Could not connect: ' . mysql_error());
  }
$conn->query("set character 'utf8';");
$conn->query("SET NAMES utf8");
$result = $conn->query("select 年龄 as age,count(*) as count from LC group by 年龄;");
$outp1 = "[";
$outp2 = "[";

while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp1 != "[") {$outp1 .= ",";}
    $outp1 .= '"'. $rs["age"]     . '"'; 
    if ($outp2 != "[") {$outp2 .= ",";}
    $outp2 .= ''. $rs["count"]     . '';
}

$outp ='{"keys":'.$outp1.'],"values":'.$outp2.']}';
$conn->close();
echo($outp);
?>

