import { useRouter as useExpoRouter } from "expo-router";

export const useRouter = () => {
  const router = useExpoRouter();
  // home
  const routeToHome = () => {
    router.push({ pathname: "/" });
  };
  // sample
  const routeToSearch = (id: string) => {
    router.push({ pathname: "/(screen)/search", params: { id: id } });
  };

  return {
    routeToHome,
    routeToSearch,
  };
};
