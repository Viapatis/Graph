import {
    Graph
} from "./src/sripts/graph"
// var request = new Request('https://api.myjson.com/bins/13ekc2');
// fetch(request,{mode: 'cors'})
//     .then(function (response) {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error("Network response was not ok.");
//     })
//     .then(function (obj) {
//         createGr(obj);
//     }).catch(function (error) {
//         console.log('There has been a problem with your fetch "operation": ' + error.message);
//     });
document.addEventListener('DOMContentLoaded',function(event){
    console.log('dd');
    createGr(json);
})
function createGr(json) {
    const root=document.getElementsByClassName('root')[0];
    json.forEach(element => {
        var t1=new Date();
        const main = document.createElement("div");
        main.className = 'main';
        root.appendChild(main);
        const graph = new Graph(main);
        console.log(new Date()-t1);
        graph.setData(element);
        console.log(new Date()-t1);
        graph.rendering();
        console.log(new Date()-t1);
    });
}