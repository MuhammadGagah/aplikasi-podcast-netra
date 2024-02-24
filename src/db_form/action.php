<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');

include "db_config.php";

$postjson = json_decode(file_get_contents('php://input'), true);
$aksi = strip_tags($postjson['aksi']);
$data = array();

switch ($aksi) {
  case "add_form":
    $fields = ['nama', 'nohp', 'jenis_kelamin', 'tgl_lahir', 'pekerjaan', 'hobi', 'biografi', 'judul_podcast', 'deskripsi_podcast', 'segmen_podcast', 'url_file', 'status'];
    $filteredData = array_map(function ($field) use ($postjson) {
      return filter_var($postjson[$field], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    }, $fields);

    try {
      $sql = "INSERT INTO `host` (nama, nohp, jenis_kelamin, tgl_lahir, pekerjaan, hobi, biografi, judul_podcast, deskripsi_podcast, segmen_podcast, url_file, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      $stmt = $pdo->prepare($sql);
      $stmt->execute($filteredData);

      if ($stmt->rowCount() > 0) {
        $result = json_encode(array('success' => true));
      } else {
        $result = json_encode(array('success' => false, 'msg' => 'Failed to insert data.'));
      }
      echo $result;
    } catch (PDOException $e) {
      echo $e->getMessage();
    }
    break;

  case "getdata":
    $limit = filter_var($postjson['limit'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $start = filter_var($postjson['start'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

    try {
      $sql = "SELECT * FROM `host` ORDER BY `host_id` DESC LIMIT :start, :limit";
      $stmt = $pdo->prepare($sql);
      $stmt->bindParam(':start', $start, PDO::PARAM_STR);
      $stmt->bindParam(':limit', $limit, PDO::PARAM_STR);
      $stmt->execute();
      $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
      $data = array_map(function ($row) {
        return array(
          'host_id' => $row['host_id'],
          'nama' => $row['nama'],
          'nohp' => (!empty($row['nohp'])) ? 'hidden' : $row['nohp'],
          'tgl_lahir' => $row['tgl_lahir'],
          'jenis_kelamin' => $row['jenis_kelamin'],
          'pekerjaan' => $row['pekerjaan'],
          'hobi' => $row['hobi'],
          'biografi' => $row['biografi'],
          'judul_podcast' => $row['judul_podcast'],
          'deskripsi_podcast' => $row['deskripsi_podcast'],
          'segmen_podcast' => $row['segmen_podcast'],
          'url_file' => (!empty($row['url_file'])) ? 'hidden' : $row['url_file'],
          'status' => $row['status'],
          'url_podcast' => $row['url_podcast']
        );
      }, $rows);

      if ($stmt) {
        $result = json_encode(array('success' => true, 'result' => $data));
      } else {
        $result = json_encode(array('success' => false));
      }
      echo $result;
    } catch (PDOException $e) {
      echo $e->getMessage();
    }
    break;
}
