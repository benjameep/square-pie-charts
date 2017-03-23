var canvas = document.getElementById("canvy")
var ctx = canvas.getContext("2d")
var SIZE = 500
var BORDER_SIZE = 3
canvas.width = SIZE+BORDER_SIZE*2
canvas.height = SIZE+BORDER_SIZE*2

ctx.strokeStyle = "#000"
ctx.lineWidth = BORDER_SIZE
ctx.font = "30px Arial";
ctx.textBaseline="middle";
ctx.textAlign="center"

function addem(array){
    return array.reduce( (sum,num) => {
        if(typeof(num) != 'number')
            return sum + addem(num)
        else
            return sum + num
    },0)
}

function popSmallest(array){
    return array.splice(
        array.reduce( (smallest,num,i) => addem(array[smallest]) < addem(num) ? smallest : i, 0)
        ,1)[0]
}


function makeTree(array){
    var tree = array.map(num => [num])
    while(tree.length != 1){
        tree.push([popSmallest(tree),popSmallest(tree)])
    }
    return tree
}



function drawTree(tree,position,fatSide){
    if(typeof(tree[0]) == 'number'){
//        console.log(tree[0],position,fatSide)
        ctx.fillStyle = "#DDD"
        ctx.fillRect(position.x,position.y,position.width,position.height)
        ctx.strokeRect(position.x,position.y,position.width,position.height)
        ctx.fillStyle = "#000"
        ctx.fillText(tree[0],position.x+position.width/2,position.y+position.height/2);
    }
    else{
        tree.forEach( subTree => {
            var subTreePosition = JSON.parse(JSON.stringify(position))
//            console.log(subTree,position)
            subTreePosition[fatSide] = position[fatSide]*(addem(subTree)/addem(tree))
            drawTree(subTree,subTreePosition,fatSide=='height'?'width':'height')
            position[fatSide=='height'?'y':'x'] += subTreePosition[fatSide]
        })
    }
}

function generate(){
    var array = document.getElementById('input').value.split(/\D+/).map(num => +num)
    drawTree(makeTree(array),{width:SIZE,height:SIZE,x:BORDER_SIZE,y:BORDER_SIZE},'width')
}
