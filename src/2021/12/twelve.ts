export const processInput = (input: string): string[][] => {
  return input.split('\n').map(input => input.split('-'));
};

class Graph {
  private nodes: string[]
  private adj: string[][];

  constructor(edges: string[][]) {
    this.nodes = edges.flat().reduce((acc: string[], curr) => acc.includes(curr) ? acc : [...acc, curr], [])
    this.adj = new Array(this.nodes.length).fill([]);
    edges.forEach(edge => {
      const indexA = this.nodes.indexOf(edge[0]);
      const indexB = this.nodes.indexOf(edge[1]);
      this.adj[indexA] = [...this.adj[indexA] || [], edge[1]]
      this.adj[indexB] = [...this.adj[indexB] || [], edge[0]]
    });
    this.getAllPaths = this.getAllPaths.bind(this);
  }

  getAllPartTwoPaths() {
    const smallCaves = this.nodes.filter(node => !['start', 'end'].includes(node) && node === node.toLocaleLowerCase());
    const paths = [];

    for (let cave of smallCaves) {
      paths.push(...this.getAllPaths(['start'], cave))
    }
    const set = new Set<string>();
    paths.forEach(path => set.add(path.join('')))
    return set.size;
  }

  getAllPaths(path: string[], exempt: null | string, visited: number[] = new Array(this.nodes.length).fill(0)): string[][] {
    const paths: string[][] = [];
    const indexOfCurrent = this.nodes.indexOf(path[path.length - 1]);
    const potentialNodes = this.adj[indexOfCurrent];
    for (let node of potentialNodes) {
      const indexOfPotentialNode = this.nodes.indexOf(node);
      const isBigCave = node.toLowerCase() !== node;
      const hasVisited = visited[indexOfPotentialNode];
      
      // Handle Start & End Nodes
      if (node === 'start') continue;
      if (node === 'end') {
        paths.push([...path, node]);
        continue;
      }

      if (isBigCave) {
        paths.push(...this.getAllPaths([...path, node], exempt, [...visited]))
        continue;
      }

      if (!hasVisited || (node === exempt && hasVisited < 2)) {
        const newVisited = [...visited];
        newVisited[indexOfPotentialNode]++;;
        paths.push(...this.getAllPaths([...path, node], exempt, newVisited))
      }
    }
    
    return paths;
  }
}

export const partOne = (input: string[][]) => new Graph(input).getAllPaths(['start'], null).length;

export const partTwo = (input: string[][]) => new Graph(input).getAllPartTwoPaths();