import {
    Graph
} from "./src/sripts/graph"
var request = new Request('https://github.com/Viapatis/Graph/blob/master/package-lock.json');
fetch(request,{mode: 'cors'})
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
    .then(function (obj) {
        createGr(obj);
    }).catch(function (error) {
        console.log('There has been a problem with your fetch "operation": ' + error.message);
    });


function createGr(json) {
    const root=document.getElementsByClassName('root')[0];
    const main = document.createElement("div");
    main.className = 'main';
    const switchGraph = document.createElement("div");
    switchGraph.className = 'switchGraph';
    root.appendChild(main);
    root.appendChild(switchGraph);
    json.forEach((item, index) => {
        switchGraph.innerHTML += `<div class ="switcher"><input class ="switchRadio" name="graph" type="radio" value="${index}"><span>Graph ${index+1}</span></div>`;
    });
    const graph = new Graph(main);
    graph.setData(json[0]);
    graph.rendering();
    const switchRadio=switchGraph.getElementsByClassName('switchRadio');
    for(let i=0;i<switchRadio.length;i++){
        switchRadio[i].checked=i===0;
        switchRadio[i].onchange=(event)=>{
            graph.setData(json[+event.target.value]);
            graph.rendering();
        }
    }
}