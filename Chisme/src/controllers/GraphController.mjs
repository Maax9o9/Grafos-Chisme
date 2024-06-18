import Graph from '../models/graph/Graph.mjs';

const graph = new Graph();


export const handleAddVertex = (name) => {
    graph.addVertex(name);
    updateGraphView();
}


export const handleAddEdge = (from, to) => {
    graph.addEdge(from, to);
    updateGraphView();
}


export const findShortestPath = (start, end) => {
    const minDistance = graph.dijkstra(start, end);
    const pathOutput = document.getElementById('pathOutput');
    if (minDistance === -1) {
        pathOutput.textContent = 'No hay camino disponible.';
    } else {
        pathOutput.textContent = `Cantidad de personas que pasaron el chisme: ${minDistance}`;
    }
}


const updateGraphView = () => {
    const graphView = document.getElementById('graphView');
    graphView.innerHTML = ''; 

    graph.vertices.forEach(vertex => {
        const vertexElement = document.createElement('div');
        vertexElement.className = 'vertex';
        vertexElement.textContent = `Persona: ${vertex.name}`;

        const connectionsArray = Array.from(vertex.adjacencyList).map(v => v.name);
        const connections = connectionsArray.length > 0 ? connectionsArray.join(', ') : 'Sin conexiones';
        
        const connectionsElement = document.createElement('div');
        connectionsElement.className = 'connections';
        connectionsElement.textContent = `Conectado con: ${connections}`;

        vertexElement.appendChild(connectionsElement);
        graphView.appendChild(vertexElement);
    });
}
