<?php
	header('Access-Control-Allow-Origin:*');
	$input = file_get_contents("php://input");
	$user = $_GET['user'];
//	echo $user;
	$flagTime = true;
	$file = fopen("file/record.txt","a+");
	$line = 0;
	$temp = '';
	$lastLine = '';
	do{
		$temp = $lastLine;
		$lastLine = fgets($file);
		$line++;
	}while(!feof($file));
	$lastLine = $temp;
	if($line != 0){
		$startdate = date("Y/m/d H:i:s",strtotime($lastLine));
		$enddate = date("Y/m/d H:i:s");
		$day=floor((strtotime($enddate)-strtotime($startdate))/86400);
		$mod = floor((strtotime($enddate)-strtotime($startdate))%86400);
		$hour=floor((strtotime($enddate)-strtotime($startdate))%86400/3600);
		$minute=floor((strtotime($enddate)-strtotime($startdate))%86400%3600/60);
		$second=floor((strtotime($enddate)-strtotime($startdate))%86400%3600%60);
		if($day == 0){
			$flagTime = false;
		}
	}
	if(!$flagTime){
		$arr = array('flagTime' => $flagTime,	
			     'hour' => $hour,
			     'minute' => $minute,
			     'second' => $second);
		$json = json_encode($arr);
		echo $json;
	}
	else{
		$ten = 10;
		$randnum = rand(0,99);
		$num = $randnum / $ten;
		$arr = array('flagTime' => $flagTime,
			     'money' => $num);
		$json = json_encode($arr);
		echo $json;
        	$time = date("Y/m/d H:i:s");	
		fwrite($file,"$time \n");
//	echo $time
		$to = "1552034857@qq.com";
		$subject = "表白微信小程序";
		$message = "{$time} {$user} 获得了{$num}元";
		$from = "wolf666@mail.ustc.edu.cn";
		$headers = "From: $from";
		if(!mail($to,$subject,$message,$headers)){
			echo "Mailer Error: " . $mail->ErrorInfo;
		}
	}
	fclose($file);

?>
