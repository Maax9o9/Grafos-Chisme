import Vertex from './Vertex.mjs';

class Graph {
    constructor() {
        this.vertices = new Map();
    }

    addVertex = (name) => {
        if (!this.vertices.has(name)) {
            const vertex = new Vertex(name);
            this.vertices.set(name, vertex);
        }
    }

    addEdge = (from, to) => {
        if (!this.vertices.has(from) || !this.vertices.has(to)) {
            console.log(`No se puede añadir una arista entre ${from} y ${to}: Uno o ambos vértices no existen.`);
            return;
        }
        if (from === to) {
            console.log(`No se puede añadir una arista entre ${from} y ${to}: No se permiten auto-conexiones.`);
            return;
        }

        const fromVertex = this.vertices.get(from);
        const toVertex = this.vertices.get(to);

        if (fromVertex.isConnected(toVertex)) {
            console.log(`La conexión entre ${from} y ${to} ya existe.`);
            return;
        }

        fromVertex.addAdjacent(toVertex);
        toVertex.addAdjacent(fromVertex);
        console.log(`Arista añadida entre ${from} y ${to}.`);
    }

    dijkstra = (startName, endName) => {
        if (!this.vertices.has(startName) || !this.vertices.has(endName)) {
            return -1;
        }

        const distances = new Map();
        const visited = new Set();
        const queue = [];

        this.vertices.forEach((_, name) => {
            distances.set(name, Infinity);
        });
        distances.set(startName, 1);
        queue.push([startName, 1]);

        while (queue.length > 0) {
            queue.sort((a, b) => a[1] - b[1]);
            const [current, currentDistance] = queue.shift();

            if (visited.has(current)) continue;
            visited.add(current);

            const vertex = this.vertices.get(current);
            vertex.adjacencyList.forEach(adjacent => {
                if (!visited.has(adjacent.name)) {
                    const newDistance = currentDistance + 1;
                    if (newDistance < distances.get(adjacent.name)) {
                        distances.set(adjacent.name, newDistance);
                        queue.push([adjacent.name, newDistance]);
                    }
                }
            });
        }

        return distances.get(endName) === Infinity ? -1 : distances.get(endName);
    }
}

export default Graph;
