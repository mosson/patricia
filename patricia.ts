import { AppendInfo, Node } from "./node.ts";

// Particia Tree
export class Patricia {
  public static leaf: Node = new Node(""); // 葉は終端を表現する
  public root: Node;

  constructor() {
    this.root = new Node("");
  }

  public insert(seq: string): void {
    const info: AppendInfo | undefined = this.root.traverseAndSplit(seq);
    if (!info) return;

    if (info[1]) {
      info[0].children.push(new Node(info[1], [Patricia.leaf]));
    } else {
      info[0].children.push(Patricia.leaf);
    }
  }

  public search(seq: string): true | false {
    const node: Node | undefined = this.root.search(seq);
    if (!node || node.children.indexOf(Patricia.leaf) === -1) return false;
    return true;
  }
}
