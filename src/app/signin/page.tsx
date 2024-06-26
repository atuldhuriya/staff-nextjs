import dynamic from "next/dynamic";

const SignIn = dynamic(() => import("seeksolution/layouts/SignIn"), { ssr: false })

const SignInPage = () => {
  return (
    <SignIn />
  );
}

export default SignInPage
