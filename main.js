var ctx = document.getElementById("canvy").getContext("2d");

ctx.strokeStyle = "#000"
ctx.lineWidth = 3
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
        console.log(tree[0],position,fatSide)
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

var a = [59,20,50,320,498,38,54,58,10,59,99,39,58,98,23,58,48,68,29]
var tree = makeTree(a)
drawTree(tree,{width:500,height:500,x:50,y:50},'width')