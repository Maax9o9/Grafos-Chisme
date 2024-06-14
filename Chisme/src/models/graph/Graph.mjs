import Vertex from './Vertex.mjs';
import LinkedList from './LinkedList.mjs';

class Graph {
    constructor() {
        this.vertices = [];
        this.adjacencyMatrix = [];
    }

    addVertex(name) {
        const newVertex = new Vertex(name);  
        this.vertices.push(newVertex);
        this.updateAdjacencyMatrix();
    }

    addEdge(from, to) {
        const fromVertex = this.findVertex(from);
        const toVertex = this.findVertex(to);

        if (fromVertex && toVertex) {
            if (!fromVertex.adjacencyList.find(to)) {
                fromVertex.adjacencyList.add(to);
            }
            if (!toVertex.adjacencyList.find(from)) {
                toVertex.adjacencyList.add(from);
            }
            this.updateAdjacencyMatrix();
        }
    }

    findVertex(name) {
        return this.vertices.find(vertex => vertex.name === name);
    }

    updateAdjacencyMatrix() {
        const size = this.vertices.length;
        this.adjacencyMatrix = Array.from({ length: size }, () => Array(size).fill(0));

        this.vertices.forEach((vertex, i) => {
            let current = vertex.adjacencyList.head;
            while (current) {
                const j = this.vertices.findIndex(v => v.name === current.data);
                if (j !== -1) {
                    this.adjacencyMatrix[i][j] = 1;
                }
                current = current.next;
            }
        });
    }

    ds(start) {
        const startVertex = this.findVertex(start);
        if (!startVertex) return [];

        const visited = new Set();
        const result = [];

        const dsRecursive = (vertex) => {
            if (!vertex || visited.has(vertex.name)) return;
            visited.add(vertex.name);
            result.push(vertex.name);
            let current = vertex.adjacencyList.head;
            while (current) {
                const adjacentVertex = this.findVertex(current.data);
                dsRecursive(adjacentVertex);
                current = current.next;
            }
        };

        dsRecursive(startVertex);
        return result;
    }


}

export default Graph;
