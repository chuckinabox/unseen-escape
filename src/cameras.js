function cameras(camerasHit, camerasTotal){
  let cameras = document.getElementById('cameras');
  while(cameras.hasChildNodes()){
    cameras.removeChild(cameras.lastChild);
  }
  let node = document.createElement("p");
  let textnode = document.createTextNode(camerasHit + "/" + camerasTotal);
  node.appendChild(textnode);
  node.setAttribute("style", "color:red;")
  cameras.appendChild(node);
}
