import fs from 'fs';

export default (path) => {
  return fs.readFileSync(path, 'utf8');
};