import { AppendInfo, Node } from "./node.ts";
import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";

Deno.test("traverse", () => {
  let info: AppendInfo | undefined;
  const root: Node = new Node("");
  const leaf: Node = new Node("");
  info = root.traverse("TAIL");
  if (info) {
    info[0].children.push(new Node(info[1], [leaf]));
  }
  assertEquals(root.children.length, 1);
  assertEquals(root.children[0].data, "TAIL");
  assertEquals(root.children[0].children.length, 1);
  assertEquals(root.children[0].children[0], leaf);

  info = root.traverse("TAKE");
  if (info) {
    info[0].children.push(new Node(info[1], [leaf]));
  }
  assertEquals(root.children.length, 1);
  assertEquals(root.children[0].data, "TA");
  assertEquals(root.children[0].children.length, 2);
  assertEquals(root.children[0].children[0].data, "IL");
  assertEquals(root.children[0].children[1].data, "KE");
  assertEquals(root.children[0].children[0].children[0], leaf);
  assertEquals(root.children[0].children[1].children[0], leaf);
  assertEquals(root.children[0].children[0].children.length, 1);
  assertEquals(root.children[0].children[1].children.length, 1);

  info = root.traverse("TALL");
  if (info) {
    info[0].children.push(new Node(info[1], [leaf]));
  }
  info = root.traverse("TALK");
  if (info) {
    info[0].children.push(new Node(info[1], [leaf]));
  }
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

  info = root.traverse("THAT");
  if (info) {
    info[0].children.push(new Node(info[1], [leaf]));
  }
  info = root.traverse("THE");
  if (info) {
    info[0].children.push(new Node(info[1], [leaf]));
  }
  info = root.traverse("THEN");
  if (info) {
    info[0].children.push(new Node(info[1], [leaf]));
  }
  info = root.traverse("THIS");
  if (info) {
    info[0].children.push(new Node(info[1], [leaf]));
  }
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
  assertEquals(root.children[0].children[1].children[1].children[0], leaf);
  assertEquals(root.children[0].children[1].children[1].children[1].data, "N");
  assertEquals(
    root.children[0].children[1].children[1].children[1].children.length,
    1,
  );
  assertEquals(
    root.children[0].children[1].children[1].children[1].children[0],
    leaf,
  );

  assertEquals(root.children[0].children[1].children[2].data, "IS");
  assertEquals(root.children[0].children[1].children[2].children.length, 1);
  assertEquals(root.children[0].children[1].children[2].children[0], leaf);
});
