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
        const vertices = Array.from(this.vertices.keys());
        const V = vertices.length;
        const distances = {};
        const previous = {};
        const D = new Array(V).fill(Infinity);
        const L = new Array(V).fill(false); 

        vertices.forEach((vertex, index) => {
            distances[vertex] = Infinity;
            previous[vertex] = null;
            if (vertex === startName) {
                D[index] = 1;
                distances[vertex] = 1; 
            }
        });

        for (let count = 0; count < V - 1; count++) {
            let u = this.minDistance(D, L);
            if (u === -1) break;
            L[u] = true; 

            const currentVertexName = vertices[u];
            const currentVertex = this.vertices.get(currentVertexName);

            currentVertex.adjacencyList.forEach(adjacent => {
                const v = vertices.indexOf(adjacent.name);
                if (v !== -1 && !L[v] && D[u] !== Infinity && D[u] + 1 < D[v]) {
                    D[v] = D[u] + 1;
                    distances[adjacent.name] = D[v];
                    previous[adjacent.name] = currentVertexName;
                }
            });
        }

        return distances[endName] === Infinity ? -1 : distances[endName];
    }


    minDistance = (D, L) => {
        let min = Infinity;
        let minIndex = -1;

        for (let i = 0; i < D.length; i++) {
            if (!L[i] && D[i] <= min) {
                min = D[i];
                minIndex = i;
            }
        }

        return minIndex;
    }
}

export default Graph;
