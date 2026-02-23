import "dotenv/config";

import db from "../libs/drizzle";
import { users } from "../libs/drizzle/schema";

async function seed() {
  await db.insert(users).values([
    { fullName: "홍길동", phone: "010-1234-5678" },
    { fullName: "김철수", phone: "010-2345-6789" },
    { fullName: "이영희", phone: "010-3456-7890" },
  ]);

  console.log("✅ 샘플 데이터 삽입 완료");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seed 실패:", err);
  process.exit(1);
});
