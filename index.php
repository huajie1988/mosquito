<?php
/**
 * Created by PhpStorm.
 * User: Huajie
 * Date: 2016/8/4
 * Time: 10:14
 */

require './src/backend/Mosquito.php';
define('__ROOT__',$_SERVER['DOCUMENT_ROOT']);
$m = new Mosquito();
$m->run();