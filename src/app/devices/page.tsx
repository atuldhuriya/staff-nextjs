import dynamic from "next/dynamic";
const StatisticCompo = dynamic(() => import("seeksolution/components/dashboard/StatisticCompo"), { ssr: false })
const DashboardPage = () => {
  return (
    <StatisticCompo />
  );
}
export default DashboardPage