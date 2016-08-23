<?php
/**
 * Created by PhpStorm.
 * User: Huajie
 * Date: 2016/8/4
 * Time: 10:13
 */

class Mosquito {

    private $controller='';
    private $pdo;
    private $instance;

    private function returnJSONResult($msg='',$errCode=0,$data=[]){
        exit(json_encode(['msg'=>$msg,'err_code'=>$errCode,'data'=>$data]));
    }

    private function isGetRequset(){
        return strtolower($_SERVER['REQUEST_METHOD'])=='get';
    }

    private function filterVal($val,$filter){

        if (trim($filter)==''){
            $filter='string';
        }

        $func=$filter.'Filter';
        return $this->$func($val);
    }

    private function intFilter($val){
        return intval($val);
    }

    private function floatFilter($val){
        return floatval($val);
    }

    private function stringFilter($val){
        return strip_tags($val);
    }

    private function boolFilter($val){

        if(is_bool($val))
            return $val;
        
        return $this->intFilter($val)!=0;
    }

    private function getData($filter){
        $data=$_GET;
        if(!$this->isGetRequset()){
            $data=$_POST;
        }

        foreach ($filter as $k=>$v) {
            if (isset($data[$k]))
                $filter[$k] = $this->filterVal($data[$k],$filter[$k]);
        }

        return $filter;

    }

    private function connectSqlite(){
        return new PDO('sqlite:'.__ROOT__.'/data/data.db');
    }

    private function doSql($sql,$args=[]){
        $sth=$this->pdo->prepare($sql);
        $sth->execute($args);
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    private function doSqlSingle($sql,$args=[]){
        $ret=$this->doSql($sql,$args);
        return isset($ret[0])?$ret[0]:[];
    }

    public function __construct(){
        $this->controller=isset($_GET['c'])?trim($_GET['c']):'';
        $this->pdo=$this->connectSqlite();

    }

    public function run(){

        if($this->controller=='' || $this->controller==__FUNCTION__ || !method_exists(__CLASS__,$this->controller)){
            $this->returnJSONResult('The request function don\'t exist',1);
        }

        $funcObj = new ReflectionMethod(__CLASS__,$this->controller);

        if(!$funcObj->isPublic() || $funcObj->isConstructor()){
            $this->returnJSONResult('The request function don\'t exist',1);
        }

        $cls = new ReflectionClass(__CLASS__);
        $this->instance=$instance=$cls->newInstance();
        $func=$this->controller;
        $instance->$func();
    }

    public function getText(){
        $data=[
            'current'=>'int',
        ];

        $data=$this->getData($data);
        $this->returnJSONResult('Get text success',0,$this->getTextProcess($data['current']));
    }


    private function getTextProcess($currentFrame){
        $sql="SELECT next FROM text WHERE id=:id";
        $ret=$this->doSqlSingle($sql,[':id'=>$currentFrame]);
        $id1=$ret['next'];

        $sql="SELECT id FROM text WHERE id>=:id AND next=:next";
        $ret=$this->doSqlSingle($sql,[':id'=>$id1,':next'=>0]);
        $id2=$ret['id'];

        $sql="SELECT * FROM text WHERE id>=:id AND id<=:id2";
        $ret=$this->doSql($sql,[':id'=>$id1,':id2'=>$id2]);

        foreach ($ret as $k=>$v) {
            $ret[$k]['textbox']=(array)json_decode($v['textbox']);
            $ret[$k]['img']=(array)json_decode($v['img']);
            $ret[$k]['option']=(array)json_decode($v['option']);
            $ret[$k]['func']=(array)json_decode($v['func']);
        }

        return $ret;

    }

}