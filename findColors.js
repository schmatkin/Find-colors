
var size=4;
var arr = ['Red','Yellow','Green','Blue','Cyan','Orange','Gray','Purple',
           'Red','Yellow','Green','Blue','Cyan','Orange','Gray','Purple'];


var newArr=[];
var nArr=[];
var k=0;
var moveNum=0;
var colorCellPrew;
var check=true; // true - если только начинаем поиск, false - если один блок с цветом открыт и ищем пару
var elemOld;
var elemNew;
var moveWin=0;
var sec;
var timerId;
window.onload=function(){
  //document.getElementById("game").style.backgroundColor="Black";

  
  colorMash(true);
  document.getElementById("start").onclick =function(){
  simpleTimer();
  start();
  }  
 
 
}//window.onload
//перемешиваем расположение блоков в произвольном порядке, при загрузке страницы добавляем блоки <div>
function colorMash(varBool){
  k=0;
  var arr1=[];
  arr1=arr.slice();
  arr1.sort(strRandom);
  newArr=arr1.slice();
  if(varBool){
    //alert(true);
    for (var i = 0; i <size; i++){
      for (var j = 0; j < size; j++) {
         //nArr=nArr.concat(`${+i+""+j+newArr[k]}`);
         document.getElementById("game").innerHTML+=`<div class="block" id="${+i+""+j+newArr[k]}"></div>`;
         k++;
      }
    }


  } else{
    //alert(false);
    console.log(newArr);
    for (var i = 0; i <size; i++){
      for (var j = 0; j < size; j++){
           nArr=nArr.concat(`${+i+""+j+newArr[k]}`);
           k++;
          }   
      }
     //console.log(nArr);
      var qS = document.querySelectorAll(".block");
      for(var i=0;i<qS.length;i++){ 
        var item=qS[i];
        var s= nArr[i];
        item.id=s;
        //console.log(nArr);
      }
   }
 
}
//вспомогательная функция для перемешивания массива
function strRandom(a,b){
  return Math.random()-0.5;
}
//очищаем в ячейках все цвета заменяя белым
function clearCells(){
   var qS = document.querySelectorAll(".block");
   for(var i=0;i<qS.length;i++)
      { 
       var item=qS[i];
       item.style.backgroundColor="White";
       //item.classList.toggle(newArr[i]);
       if(item.classList.contains(newArr[i])){
        
        item.classList.remove(newArr[i]);
       }
      }
     
  
}
//Ненадолго показываем раскрашеные блоки
function Preview(){
  var qS = document.querySelectorAll(".block");
   for(var i=0;i<qS.length;i++){ 
       var item=qS[i];
       item.style.backgroundColor=newArr[i];
      }
      setTimeout(function(){
      for(var i=0;i<qS.length;i++){ 
       var item=qS[i];
       item.style.backgroundColor="White";
      }
    }
      ,700);
}
//Запускаем простой таймер, считающий лишь секунды
function simpleTimer(){
   sec=0;
   timerId=setInterval(function(){
     sec++;
     document.getElementById("cClock").childNodes[0].nodeValue=sec;
    },1000) 
}
//останавливаем простой таймер
function stopSimpleTimer(){
 clearInterval(timerId);
 document.getElementById("cClock").childNodes[0].nodeValue='0';
}
// функция описывающая логику игры
function start(){
   
     Preview();
     moveWin=0;
     moveNum=0;
     var varGame=document.getElementById("game");
     // если есть запрет на щелчки по полям, снимаем его
     if(varGame.classList.contains('stopClick')){
        
         varGame.classList.remove('stopClick');
     }
   
     
    document.getElementById("game").onclick = function(event){
   
    moveNum++;
    //alert(moveNum);
    if(event.target.className == "block"){
     // кликнутый блок
     elemNew=event.target.id;
     // цвет кликнутого блока
     var colorCellNew=elemNew.slice(2,elemNew.Length);
     
     
     //начинаем поиск пары
     if(check===true){
       
       document.getElementById(elemNew).style.backgroundColor=colorCellNew;
       //document.getElementById(elemNew).classList.add(colorCellNew);
       check=false;
       return( colorCellPrew=colorCellNew,elemOld=elemNew);
     }
   
     //если отгадали с цветом второго блока, закрашиваем оба и оставляем
     if(colorCellPrew==colorCellNew&&check===false){
       moveWin++;
       document.getElementById(elemNew).style.backgroundColor=colorCellNew;
       document.getElementById(elemNew).classList.add(colorCellNew);
       document.getElementById(elemOld).classList.add(colorCellPrew);
       console.log(colorCellPrew);
       colorCellPrew='q';
       check=true;
       if(moveWin==8){//если нашли все цвета - заканчиваем, остановив таймер, стираем клетки и перемешиваем, блокируя нажатия по ним
         alert("You win!\n" +moveNum+" moves"+ " and "+document.getElementById("cClock").childNodes[0].nodeValue+" seconds");
         stopSimpleTimer();
         clearCells();
         colorMash(false);
         document.getElementById("game").classList.add('stopClick');
  
        }
      }else{//если не угадали, красив в белый обе клетки и начинаем заново
        //alert(elemOld);
        document.getElementById(elemNew).style.backgroundColor=colorCellNew; 
        setTimeout(function(){
 	      //alert('1');         
        document.getElementById(elemNew).style.backgroundColor="White"; 
        document.getElementById(elemOld).style.backgroundColor="White";	      
       },100); 
        
        check=true;  
      }
    
    }
    
  }
}