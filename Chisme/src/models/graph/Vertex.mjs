class Vertex {
    constructor(name) {
        this.name = name;
        this.adjacencyList = new Set();
    }

    addAdjacent = (vertex) => {
        this.adjacencyList.add(vertex);
    }

    isConnected = (vertex) => {
        return this.adjacencyList.has(vertex);
    }
}

export default Vertex;
