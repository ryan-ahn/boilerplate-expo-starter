import { useRouter as useExpoRouter } from "expo-router";

export const useRouter = () => {
  const router = useExpoRouter();
  // home
  const routeToHome = () => {
    router.push({ pathname: "/" });
  };
  // sample
  const routeToSample = (id: string) => {
    router.push({ pathname: "/sample", params: { id: id } });
  };

  return {
    routeToHome,
    routeToSample,
  };
};
