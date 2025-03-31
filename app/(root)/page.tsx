import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import Image from "next/image";

const Home = async () => {

  const result = await db.select().from(users);

  console.log(JSON.stringify(result, null, 2));


  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-10 xl:p-24">
      Hello World
    </div>
  );
}

export default Home;