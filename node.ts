type AppendTarget = Node;
type AppendData = string;
export type AppendInfo = [AppendTarget, AppendData];

export class Node {
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

  public traverse(seq: string): AppendInfo | undefined {
    const child = this.search(seq.substr(0, 1));
    if (!child) return [this, seq]; // this.childrenにseqで表現されるノードを追加して欲しい

    // 何文字目までマッチするか
    let matchedLen: number;
    for (matchedLen = 1; matchedLen < seq.length; matchedLen++) {
      if (
        seq.substr(matchedLen, 1) !== child.data.substr(matchedLen, 1)
      ) {
        break;
      }
    }

    // 何もしないパターン: seqとchild.dataがすべてマッチする
    if (matchedLen >= seq.length) return undefined;

    if (child.data.length > matchedLen) {
      // 分割するパターン: 枝のデータ内容が入力文字と途中まで一致している
      const children: Node[] = this.delete(child);
      const newNode = new Node(
        child.data.substr(0, matchedLen),
        [new Node(child.data.substr(matchedLen), children)],
      );
      this.children.push(newNode);
      return [newNode, seq.substr(matchedLen)];
    } else {
      // 再帰的に探索: 入力文字の途中で枝データが切れるためさらに先の枝までいる必要がある
      return child.traverse(seq.substr(matchedLen));
    }
  }

  public delete(child: Node): Node[] {
    const i: number = this.children.indexOf(child);
    if (i >= 0) {
      return this.children.splice(i, 1)[0].children;
    }
    return [];
  }
}
