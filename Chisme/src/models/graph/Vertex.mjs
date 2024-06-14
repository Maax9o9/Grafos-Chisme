import LinkedList from './LinkedList.mjs';

class Vertex {
    constructor(name) {
        this.name = name;
        this.adjacencyList = new LinkedList();
    }
}

export default Vertex;
