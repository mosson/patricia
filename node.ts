type AppendTarget = Node;
type AppendData = string;
export type AppendInfo = [AppendTarget, AppendData];

export class Node {
  // 対象のnodeが入力されたseqに対して何文字目までマッチするか
  private static getMatchedLen(node: Node, seq: string): number {
    let matchedLen: number;
    for (matchedLen = 1; matchedLen < seq.length; matchedLen++) {
      if (
        seq.substr(matchedLen, 1) !== node.data.substr(matchedLen, 1)
      ) {
        break;
      }
    }
    return matchedLen;
  }

  public data: string;
  public children: Node[];
  constructor(data: string, children: Node[] = []) {
    this.data = data;
    this.children = children;
  }

  // 入力文字の１文字目にマッチする枝があれば返却
  public search(char: string): Node | undefined {
    return this.children.find((child) => {
      return child.data && child.data.substr(0, 1) === char;
    });
  }

  public traverseAndSplit(seq: string): AppendInfo | undefined {
    const child = this.getNodeByFirstChar(seq.substr(0, 1));
    if (!child) return [this, seq]; // this.childrenにseqで表現されるノードを追加して欲しい

    // 何文字目までマッチするか
    const matchedLen: number = Node.getMatchedLen(child, seq);

    // 何もしないパターン: seqとchild.dataがすべてマッチする
    if (matchedLen === seq.length && seq.length === child.data.length) {
      return undefined;
    }

    if (child.data.length > matchedLen) { // 子ノードのデータが入力文字と途中まで一致している = 分割が必要
      const children: Node[] = this.deleteChild(child);
      const newNode = new Node(
        child.data.substr(0, matchedLen),
        [new Node(child.data.substr(matchedLen), children)],
      );
      this.children.push(newNode);
      return [newNode, seq.substr(matchedLen)];
    } else { // 子ノードのデータと入力文字が一致しているが入力文字を読み終えていない = 孫ノード以降も探索が必要
      return child.traverseAndSplit(seq.substr(matchedLen));
    }
  }

  // 入力文字の１文字目にマッチする枝があれば返却
  private getNodeByFirstChar(char: string): Node | undefined {
    return this.children.find((child) => {
      return child.data && child.data.substr(0, 1) === char;
    });
  }

  private deleteChild(child: Node): Node[] {
    const i: number = this.children.indexOf(child);
    if (i >= 0) {
      return this.children.splice(i, 1)[0].children;
    }
    return [];
  }
}
