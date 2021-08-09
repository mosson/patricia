import { AppendInfo, Node } from "./node.ts";
import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";

Deno.test("traverse", () => {
  const root: Node = new Node("");
  const leaf: Node = new Node("");

  function insert(seq: string): void {
    const info: AppendInfo | undefined = root.traverseAndSplit(seq);
    if (!info) return;

    if (info[1]) {
      info[0].children.push(new Node(info[1], [leaf]));
    } else {
      info[0].children.push(leaf);
    }
  }

  function isFound(seq: string): boolean {
    const node: Node | undefined = root.search(seq);
    if (!node) return false;
    return node.children.indexOf(leaf) >= 0;
  }

  insert("TAIL");
  assertEquals(root.children.length, 1);
  assertEquals(root.children[0].data, "TAIL");
  assertEquals(root.children[0].children.length, 1);
  assertEquals(root.children[0].children[0], leaf);

  assertEquals(isFound("TAIL"), true);
  assertEquals(isFound("TA"), false);
  assertEquals(isFound("T"), false);
  assertEquals(isFound("TAKE"), false);

  insert("TAKE");
  assertEquals(root.children.length, 1);
  assertEquals(root.children[0].data, "TA");
  assertEquals(root.children[0].children.length, 2);
  assertEquals(root.children[0].children[0].data, "IL");
  assertEquals(root.children[0].children[1].data, "KE");
  assertEquals(root.children[0].children[0].children[0], leaf);
  assertEquals(root.children[0].children[1].children[0], leaf);
  assertEquals(root.children[0].children[0].children.length, 1);
  assertEquals(root.children[0].children[1].children.length, 1);

  assertEquals(isFound("TAIL"), true);
  assertEquals(isFound("TA"), false);
  assertEquals(isFound("T"), false);
  assertEquals(isFound("TAKE"), true);

  insert("TALL");
  insert("TALK");
  assertEquals(root.children.length, 1);
  assertEquals(root.children[0].data, "TA");
  assertEquals(root.children[0].children.length, 3);
  assertEquals(root.children[0].children[2].data, "L");
  assertEquals(root.children[0].children[2].children.length, 2);
  assertEquals(root.children[0].children[2].children[0].data, "L");
  assertEquals(root.children[0].children[2].children[0].children.length, 1);
  assertEquals(root.children[0].children[2].children[0].children[0], leaf);
  assertEquals(root.children[0].children[2].children[1].data, "K");
  assertEquals(root.children[0].children[2].children[1].children.length, 1);
  assertEquals(root.children[0].children[2].children[1].children[0], leaf);

  assertEquals(isFound("TALL"), true);
  assertEquals(isFound("TALK"), true);

  insert("THAT");
  insert("THEN");
  insert("THE");
  insert("THIS");

  assertEquals(root.children.length, 1);
  assertEquals(root.children[0].data, "T");
  assertEquals(root.children[0].children.length, 2);
  assertEquals(root.children[0].children[0].data, "A");
  assertEquals(root.children[0].children[1].data, "H");

  assertEquals(root.children[0].children[0].children.length, 3);

  assertEquals(root.children[0].children[1].children.length, 3);
  assertEquals(root.children[0].children[1].children[0].data, "AT");
  assertEquals(root.children[0].children[1].children[0].children.length, 1);
  assertEquals(root.children[0].children[1].children[0].children[0], leaf);

  assertEquals(root.children[0].children[1].children[1].data, "E");
  assertEquals(root.children[0].children[1].children[1].children.length, 2);
  assertEquals(root.children[0].children[1].children[1].children[0].data, "N");
  assertEquals(
    root.children[0].children[1].children[1].children[0].children.length,
    1,
  );
  assertEquals(
    root.children[0].children[1].children[1].children[0].children[0],
    leaf,
  );
  assertEquals(root.children[0].children[1].children[1].children[1], leaf);

  assertEquals(root.children[0].children[1].children[2].data, "IS");
  assertEquals(root.children[0].children[1].children[2].children.length, 1);
  assertEquals(root.children[0].children[1].children[2].children[0], leaf);

  assertEquals(isFound("THAT"), true);
  assertEquals(isFound("THEN"), true);
  assertEquals(isFound("THE"), true);
  assertEquals(isFound("THIS"), true);
});
