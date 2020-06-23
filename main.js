//新增一個清單的物件
var todolist={};
todolist.name="Mytodolist";
todolist.time="2016/9/10";
//代辦清單的清單裡面是個陣列，塞物件們
todolist.list=[
  {name: "sport"},
  {name: "打掃"},
  {name: "打掃"},
  {name: "打掃"},
  {name: "打掃"}
];

//定義元素用的html模板，{{名稱}}代表要套入的地方
var item_html="<li id={{id}} class='todo_item'>{{num}}.{{item}}</div><div id={{del_id}} data-delid={{del_item_id}} class='del_btn'>X</div></li>";


//刪除並重新產生清單中所有項目
function showlist(){
  $("#items_list").html("");
  
//把每個項目做出來
  for(var i=0;i<todolist.list.length;i++){
    var item=todolist.list[i];
    var item_id="todoitem_"+i;
    var del_item_id="del_todoitem_"+i;
    
    //取代模板位置成資料replace(要取代的,取代成...)
    var current_item_html=
        item_html.replace("{{num}}",i+1)
                 .replace("{{item}}",item.name)
                 .replace("{{id}}",item_id)
                 .replace("{{del_id}}",del_item_id)
                
                 .replace("{{del_item_id}}",i)

    ;
    
    //加入元素後才能夠用jquery操作
    $("#items_list").append(current_item_html);
    $("#"+del_item_id).click(
      function(){
        remove_item(parseInt($(this).attr("data-delid")));
      }
    );
  }
  
}
//先顯示一次，因為前面只定義好function 還沒有執行
showlist();

// 新增資料流程: 動態push一筆資料->呼叫showlist重新渲染清單
$(".addbtn").click(
  function(){
    //使用val()存取輸入的值，val("..") 有給參數是設定
    todolist.list.push(
      {
        name:$("#input_name").val(),
       
      }
    );
    $("#input_name").val("");
  
    showlist();
  }
  
);

//刪除項目 陣列.splice(位置,長度) 
//刪除資料->重新根據資料渲染清單
function remove_item(id){
  todolist.list.splice(id,1);
  showlist();
}

