import { handleAddVertex, handleAddEdge, findShortestPath } from '../controllers/GraphController.mjs';

document.getElementById('addVertex').addEventListener('click', () => {
    const vertexInput = document.getElementById('vertexInput').value.trim();
    if (vertexInput) {
        handleAddVertex(vertexInput);

        document.getElementById('vertexInput').value = '';
    }
});

document.getElementById('addEdge').addEventListener('click', () => {
    const fromInput = document.getElementById('fromInput').value.trim();
    const toInput = document.getElementById('toInput').value.trim();
    if (fromInput && toInput) {
        handleAddEdge(fromInput, toInput);

        document.getElementById('fromInput').value = '';
        document.getElementById('toInput').value = '';
    }
});

document.getElementById('findShortestPath').addEventListener('click', () => {
    const startVertex = document.getElementById('startVertex').value.trim();
    const endVertex = document.getElementById('endVertex').value.trim();
    if (startVertex && endVertex) {
        findShortestPath(startVertex, endVertex);

        document.getElementById('startVertex').value = '';
        document.getElementById('endVertex').value = '';
    }
});
