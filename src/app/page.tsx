import Link from "next/link";

export default function Home() {
  return (
   <Link href={`/dashboard`}> <h1>Dashboard</h1></Link>
  );
}
