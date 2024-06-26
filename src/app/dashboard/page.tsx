import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";
const StatisticCompo = dynamic(() => import("seeksolution/components/dashboard/StatisticCompo"), { ssr: false })
const DashboardPage = () => {
  return (
    redirect("/devices/page/1")
    // <StatisticCompo />
  );
}
export default DashboardPage