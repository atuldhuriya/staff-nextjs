import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "seeksolution/utils/constant";
const DevicesCreate = dynamic(() => import("seeksolution/components/devices/DevicesCreate"), { ssr: false })
const DeviceListPage = () => {

  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value || ""

  return (
    <DevicesCreate accessToken={accessToken} />
  );
}
export default DeviceListPage