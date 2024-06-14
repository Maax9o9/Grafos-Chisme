import { handleAddVertex, handleAddEdge, findShortestPath } from '../controllers/GraphController.mjs';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addVertex').addEventListener('click', () => {
        const vertexName = document.getElementById('vertexInput').value;
        if (vertexName) {
            handleAddVertex(vertexName);
            document.getElementById('vertexInput').value = '';
        }
    });

    document.getElementById('addEdge').addEventListener('click', () => {
        const from = document.getElementById('fromInput').value;
        const to = document.getElementById('toInput').value;
        if (from && to) {
            handleAddEdge(from, to);
            document.getElementById('fromInput').value = '';
            document.getElementById('toInput').value = '';
        }
    });

    document.getElementById('findShortestPath').addEventListener('click', () => {
        const start = document.getElementById('startVertex').value;
        const end = document.getElementById('endVertex').value;
        if (start && end) {
            const result = findShortestPath(start, end);
            document.getElementById('pathOutput').textContent = result;
        }
    });
});
