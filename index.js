import {
    Graph
} from "./src/sripts/graph"
const url = "https://github.com/Viapatis/Graph/blob/master/chart_data.json";
fetch(url)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
    .then(function (obj) {
        createGr(obj);
    });
.catch(function (error) {
    console.log('There has been a problem with your fetch "operation": ' + error.message);
});


function createGr(json) {
    const main = document.getElementsByClassName("main")[0];
    const graph = new Graph(main);
    graph.setData(json[4]);
    graph.rendering();

}