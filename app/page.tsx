import { Time } from "@/components/features/theme/time";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center h-full px-12 relative">
      <Time />
      <MainTitle />
      <div className="absolute bottom-80 right-120">
        <Description desc="Build faster. Build better." />
        <Description desc="A living boilerplate built from real projects,\n evolving for speed, consistency, and stability." />
      </div>
    </div>
  );
}

const MainTitle = () => {
  return <div className="text-7xl">DUKE's BOILERPLATE</div>;
};

const Description = ({ desc }: { desc: string }) => {
  return <p className="whitespace-pre-wrap text-2xl">{desc}</p>;
};
