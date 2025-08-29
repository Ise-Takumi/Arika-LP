<?php
  header('X-Frame-Options: SAMEORIGIN');
  ini_set('display_errors', "On");
  session_start();

  /* お問い合わせフォーム */
  $success_message = "";
  $errors = [];
  $max_count = 100;

  $inquiry_type_list = [
    1 => "個別無料相談"
    ,2 => "クリエイティブ"
    ,3 => "SNSマーケティング"
    ,4 => "AIマーケティング"
    ,5 => "システム・アプリ開発"
  ];

  // トークンの生成
  if(empty($_SESSION['form_token'])){
    $token = bin2hex(random_bytes(32));
    $_SESSION['form_token'] = $token;
  }
  $data['_name'] = null;
  $data['company'] = null;
  $data['email'] = null;
  $data['tel'] = null;
  $data['inquiry_type'] = [];
  $data['message'] = null;
  $data['privacy'] = null;

  // フォームが送信されたら処理
  if (isset($_POST['form_token'])) {
	
      //トークンが送信されているかの確認
  	if (!isset($_POST['form_token'])) {
      	$errors['common'] = '不正なリクエストです。';
	
    //トークンが合っているかの検証
    }else if ($_POST['form_token'] !== $_SESSION['form_token']) {
      $errors['common'] = '不正なリクエストです';
    }
    // フォームからのデータを取得
    $data['_name'] = htmlspecialchars($_POST["_name"]);
    $data['company'] = htmlspecialchars($_POST["company"]);
    $data['email'] = htmlspecialchars($_POST["email"]);
    $data['tel'] = htmlspecialchars($_POST["tel"]);
    $data['inquiry_type'] = $_POST["inquiry_type"] ?? [];
    $data['message'] = htmlspecialchars($_POST["message"]);
    $data['privacy'] = htmlspecialchars($_POST["privacy"] ?? "");

    // 入力値のバリデーション
    if (empty($data['_name'])) {
      $errors['_name'] = "この欄の入力は必須です。";
    }else if(isset($data['_name']) && mb_strlen($data['_name']) > $max_count){
      $errors['_name'] = "お名前 は ".$max_count."文字以内で入力してください。";
    }else if (preg_match('/[&"\'<>]/', $data['_name'])) {
      $errors['_name'] = "お名前 に使用できない文字が含まれています。";
    }
    if (empty($data['company'])) {
      $errors['company'] = "この欄の入力は必須です。";
    }else if(isset($data['company']) && mb_strlen($data['company']) > $max_count){
      $errors['company'] = "会社名 は ".$max_count."文字以内で入力してください。";
    }else if (preg_match('/[&"\'<>]/', $data['_name'])) {
      $errors['company'] = "会社名 に使用できない文字が含まれています。";
    }
    if (empty($data['email'])) {
      $errors['email'] = "この欄の入力は必須です。";
    }else if(isset($data['email']) && mb_strlen($data['email']) > $max_count){
      $errors['email'] = "メールアドレス は ".$max_count."文字以内で入力してください。";
    }else if (preg_match('/[&"\'<>]/', $data['email'])) {
      $errors['email'] = "有効なメールアドレスを入力してください。";
    }
    if (empty($data['tel'])) {
      $errors['tel'] = "この欄の入力は必須です。";
    }else if( !preg_match('/^(0{1}\d{1,4}-{0,1}\d{1,4}-{0,1}\d{4})$/', $data['tel'] ) ) {
      $errors['tel'] = "電話番号 を正しく入力してください。";
    }else if (preg_match('/[&"\'<>]/', $data['tel'])) {
      $errors['tel'] = "電話番号 に使用できない文字が含まれています。";
    }
    // ご興味のあるサービス
    if(isset($data['inquiry_type']) && !is_array($data['inquiry_type'])){
      $errors['inquiry_type'] = "ご興味のあるサービス を正しく選択してください。";
    }
    // お問い合わせ内容
    if (empty($data['message'])) {
      $errors['message'] = "この欄の入力は必須です。";
    }else if(isset($data['message']) && mb_strlen($data['message']) > 500){
      $errors['message'] = "お問い合わせ内容 は 500文字以内で入力してください。";
    }else if (preg_match('/[&"\'<>]/', $data['message'])) {
      $errors['message'] = "お問い合わせ内容 に使用できない文字が含まれています。";
    }
    // 同意
    if(empty($data['privacy'])){
        $errors['privacy'] = "個人情報保護方針への同意がされてません。";
    }else if(isset($data['privacy']) && $data['privacy'] != "1"){
        $errors['privacy'] = "個人情報保護方針への同意がされてません。";
    }
    
    if (isset($data['company']) && isset($data['_name']) && isset($data['email']) && isset($data['tel']) &&
    isset($data['message']) && count($errors) == 0) {

      mb_language("Japanese");
      mb_internal_encoding("UTF-8");

      // メールの送信 
      $to = "support@ari-ka.co.jp";
      // 送信先のメールアドレスを指定 
      $subject = "サイトよりお問い合わせがありました。";
      $message_body = "お名前: " . $data['_name'] . "\n";
      $message_body .= "会社名: " . $data['company'] . "\n";
      $message_body .= "メールアドレス: " . $data['email'] . "\n";
      $message_body .= "電話番号: " . $data['tel'] . "\n";
      $message_body .= "ご興味のあるサービス: \n"; 
      if(count($data['inquiry_type']) > 0){
        foreach($data['inquiry_type'] as $inquiry_type){
          $message_body .= $inquiry_type_list[$inquiry_type] . "\n"; 
        }
      }
      $message_body .= "お問い合わせ内容:\n" . $data['message']; 
      $headers = "From: " .$data['_name']. "<".$data['email'].">";
      if (mb_send_mail($to, $subject, $message_body, $headers)) { 
        $success_message = "on"; 
      } else { 
        $errors['common'] = "メールの送信に失敗しました。後でもう一度お試しください。"; 
      }
      // 入力データ削除
      $data['_name'] = null;
      $data['company'] = null;
      $data['email'] = null;
      $data['tel'] = null;
      $data['inquiry_type'] = [];
      $data['message'] = null;
      $data['privacy'] = null;
    }
  }
?>