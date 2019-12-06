function Node(name) {
  this.name = name;
  this.parent = null;
  this.children = [];
  this.flatten = () => {
    return this.children.reduce((curr, child) => [...curr, child, ...child.flatten()], []);
  };
  this.countOrbits = () => {
    return this.flatten().length + this.children.reduce((curr, child) => curr + child.countOrbits(), 0);
  }
};

function Tree(rootNode) {
  this._root = rootNode;
  this.nodeDict = {
    [rootNode.name]: rootNode,
  };
  this.addOrbit = (parent, child) => {
    this.nodeDict[parent] = this.nodeDict[parent] || new Node(parent);
    this.nodeDict[child] = this.nodeDict[child] || new Node(child);
    this.nodeDict[child].parent = this.nodeDict[parent];
    this.nodeDict[parent].children.push(this.nodeDict[child]);
  }
  this.countOrbits = () => {
    return this._root.countOrbits();
  }
}

export const createTree = (input) => {
  const tree = new Tree(new Node('COM'));
  input.split(`\n`)
    .map(orbit => orbit.split(')'))
    .forEach(([parent, child]) => {
      tree.addOrbit(parent, child);
    })
  return tree;
}

export const partOne = (input) => createTree(input).countOrbits();

export const partTwo = (input) => {
  const tree = createTree(input);
  const visitedDict = {};
  let paths = [tree.nodeDict['YOU'].parent]; // The Object "YOU" are orbiting
  let i = 0;
  while (paths.length) {
    paths.forEach(({ name }) => { visitedDict[name] = true; });
    let newPaths = [];
    paths.forEach((path) => {
      newPaths = [...newPaths, ...[path.parent, ...path.children].filter((node) => node && !visitedDict[node.name])];
    });
    if(newPaths.find(({ name }) => name === 'SAN')) {
      return i;
    }
    paths = newPaths;
    i++;
  }
}