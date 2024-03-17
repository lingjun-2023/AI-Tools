import Image from "next/image";
import MainCard from "@/components/MainCard";
import { listData } from "@/util/data";

export default function Home() {
  return (
    <main
      className="flex overflow-y-auto flex-col px-48 h-screen  w-full "
    >
      <div className=" mt-24">
        <h1
          className="text-6xl text-blue-500 font-bold"
        >  Ai-Tools
        </h1>
        <div
          className="text-4xl pt-4"
        >
          集成了主流Ai功能的开源项目
        </div>
      </div>
      <div className=" w-full gap-7 grid grid-cols-3 pt-16 items-center">
        {listData.map(item=>(
          <MainCard
            key={item.Title}
            list={item}
          />
        ))}
      </div>
    </main>
  );
}
