<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");

function get_days($date1, $date2)
{
$time1 = strtotime($date1);
$time2 = strtotime($date2);
return ($time2-$time1)/86400;
}


$conn = new mysqli("localhost", "root", "1234", "ppd_demo");
if (!$conn)
  {
  die('Could not connect: ' . mysql_error());
  }
$conn->query("set character 'utf8';");
$conn->query("SET NAMES utf8");
$result = $conn->query("SELECT * FROM LC limit 500;");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '["'   . $rs["历史正常还款期数"]        . '",';
    $outp .= '"'   . ($rs["借款金额"]/10000)        . '",';
    $outp .= '"'   . $rs["借款期限"]        . '",';
    $outp .= '"'   . $rs["借款利率"]        . '",';
    $outp .= '"'   . get_days($rs["借款成功日期"],"2017-01-01")        . '",';
    $outp .= '"'   . $rs["年龄"]        . '",';
    $outp .= '"'   . $rs["历史逾期还款期数"]        . '",';
    $outp .= '"'. $rs["初始评级"]     . '"]'; 
}
$outp ='{"data":['.$outp.']}';
$conn->close();
echo($outp);
?>

