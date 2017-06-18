<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");

$conn = new mysqli("localhost", "root", "1234", "dataproduct");
if (!$conn)
  {
  die('Could not connect: ' . mysql_error());
  }
$conn->query("set character 'utf8';");
$conn->query("SET NAMES utf8");
$result = $conn->query("SELECT * FROM bid limit 500;");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '['   . $rs["Loan_ID"]        . ',';
    $outp .= ''   . $rs["Amount"]        . ',';
    $outp .= ''   . $rs["Interest"]        . ',';
    $outp .= ''   . $rs["Months"]        . ',';
    $outp .= '"'   . $rs["Description"]        . '",';
    $outp .= '"'   . $rs["Credit"]        . '",';
    $outp .= '"'   . $rs["Open_Time"]        . '",';
    $outp .= '"'   . $rs["FinishedRatio"]        . '",';
    $outp .= '"'   . $rs["Title"]        . '",';
    $outp .= '"'. $rs["Status"]     . '"]'; 
}
$outp ='{"data":['.$outp.']}';
$conn->close();
echo($outp);
?>
