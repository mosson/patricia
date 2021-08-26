パトリシア木の学習用
===

実用では葉ノードにデータを入れて取り出せることを達成すべき。
この実装では検索・追加・削除をどうやって実装するかを理解する目的。

## Example

```typescript
import { Patricia } from "./patricia.ts";

const patricia: Patricia = new Patricia();

patricia.insert("THAT");
patricia.insert("THEN");
patricia.insert("THE");
patricia.insert("THIS");

console.log(patricia.search("THAT")); // true
console.log(patricia.search("THEN")); // true
console.log(patricia.search("THE")); // true
console.log(patricia.search("THIS")); // true
console.log(patricia.search("THI")); // false

patricia.delete("THAT");

console.log(patricia.search("THAT")); // false
```