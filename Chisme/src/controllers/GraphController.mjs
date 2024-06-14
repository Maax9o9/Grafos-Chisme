import Graph from '../models/graph/Graph.mjs';

const graph = new Graph();

export function handleAddVertex(name) {
    graph.addVertex(name);
    updateGraphView();
}

export function handleAddEdge(from, to) {
    graph.addEdge(from, to);
    updateGraphView();
}

export function findShortestPath(start, end) {
    const path = graph.shortestPath(start, end);
    return path.length > 0 ? `El camino más corto es: ${path.join(' -> ')}` : 'No hay camino disponible.';
}

function updateGraphView() {
    const graphView = document.getElementById('graphView');
    graphView.innerHTML = ''; 

    graph.vertices.forEach(vertex => {
        const vertexElement = document.createElement('div');
        vertexElement.className = 'vertex';
        vertexElement.textContent = `Persona: ${vertex.name}`;

       
        const connectionsArray = vertex.adjacencyList.toArray();
        const connections = connectionsArray.length > 0 ? connectionsArray.join(', ') : 'Sin conexiones';
        
        const connectionsElement = document.createElement('div');
        connectionsElement.className = 'connections';
        connectionsElement.textContent = `Conectado con: ${connections}`;

        vertexElement.appendChild(connectionsElement);
        graphView.appendChild(vertexElement);
    });
}
