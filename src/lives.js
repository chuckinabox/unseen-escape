function lives(count){
  let lives = document.getElementById('lives');
  while(lives.hasChildNodes()){
    lives.removeChild(lives.lastChild);
  }
  if (count < 0){
    count = 0;
  }
  while (count){
    let node = document.createElement("div");
    node.setAttribute("style", "background-color:blue; height:50px; width: 50px; border: 1px solid black; float:left; ")
    lives.appendChild(node);
    count--;
  }

}
