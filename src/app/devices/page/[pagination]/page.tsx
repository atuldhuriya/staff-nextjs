import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "seeksolution/utils/constant";
const DevicesListing = dynamic(() => import("seeksolution/components/devices/DevicesListing"), { ssr: false })
const DeviceListPage = () => {

  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value || ""

  return (
    <DevicesListing accessToken={accessToken} />
  );
}
export default DeviceListPage