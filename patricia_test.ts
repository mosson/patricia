import { Patricia } from "./patricia.ts";
import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";

Deno.test("Studying Patricia Tree", () => {
  const patricia: Patricia = new Patricia();

  patricia.insert("TAIL");
  assertEquals(patricia.search("TAIL"), true);
  assertEquals(patricia.search("TA"), false);
  assertEquals(patricia.search("T"), false);
  assertEquals(patricia.search("TAKE"), false);
  patricia.insert("TAKE");
  assertEquals(patricia.search("TAIL"), true);
  assertEquals(patricia.search("TA"), false);
  assertEquals(patricia.search("T"), false);
  assertEquals(patricia.search("TAKE"), true);

  patricia.insert("TALL");
  patricia.insert("TALK");
  assertEquals(patricia.search("TALL"), true);
  assertEquals(patricia.search("TALK"), true);

  patricia.insert("THAT");
  patricia.insert("THEN");
  patricia.insert("THE");
  patricia.insert("THIS");

  assertEquals(patricia.search("THAT"), true);
  assertEquals(patricia.search("THEN"), true);
  assertEquals(patricia.search("THE"), true);
  assertEquals(patricia.search("THIS"), true);

  patricia.delete("TALK");
  assertEquals(patricia.search("TALK"), false);
  assertEquals(patricia.search("TALL"), true);

  try {
    patricia.delete("hoge");
  } catch (_) {
    assertEquals(false, true);
  }
});
