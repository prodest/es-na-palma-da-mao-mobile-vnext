export interface Project {
  name: string;
  description: string;
  version: string;
  homepage: string;
  bugs: Bugs;
}

interface Bugs {
  url: string;
}
