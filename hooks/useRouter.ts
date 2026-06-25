import {
  Route,
  useRouter as useExpoRouter,
  useNavigation,
  usePathname,
} from "expo-router";

import { useBottomSheet } from "@hooks/useBottomSheet";
import { useModal } from "@hooks/useModal";

type RouteState = {
  name?: string;
  path?: string;
  params?: Record<string, unknown>;
  state?: StackState;
};

type StackState = {
  index?: number;
  routes?: RouteState[];
};

type RouteSnapshot = {
  name: string;
  path?: string;
  params?: Record<string, unknown>;
};

type BackTarget =
  | { type: "route"; route: RouteSnapshot }
  | { type: "fallback"; pathname: string; reason: string };

type Navigation = {
  getState: () => unknown;
  getParent?: () => Navigation | undefined;
};

const getFocusedLeafRoute = (route: RouteState): RouteSnapshot => {
  const childState = route.state;
  if (childState?.routes && childState.index != null) {
    const child = childState.routes[childState.index];
    if (child) return getFocusedLeafRoute(child);
  }

  return {
    name: route.name ?? "",
    path: route.path,
    params: route.params,
  };
};

const getBackTargetFromNavigator = (
  navigation: Navigation,
  popCount: number,
): BackTarget => {
  let current: Navigation | undefined = navigation;

  while (current) {
    const state = current.getState() as StackState;
    if (state.routes && state.index != null && state.index >= popCount) {
      const targetRoute = state.routes[state.index - popCount];
      if (targetRoute) {
        return { type: "route", route: getFocusedLeafRoute(targetRoute) };
      }
    }
    current = current.getParent?.();
  }

  return {
    type: "fallback",
    pathname: "/(tabs)/home/rent",
    reason: "no_history",
  };
};

export const useRouter = () => {
  // hooks
  const router = useExpoRouter();
  const navigation = useNavigation();
  const pathname = usePathname();
  const { closeModal, resetModal } = useModal();
  const { closeBottomSheet, resetBottomSheet } = useBottomSheet();
  // helpers
  const resetOverlays = () => {
    closeModal();
    closeBottomSheet();
    resetModal();
    resetBottomSheet();
  };
  // logger
  const logging = (to: string | any, extra?: Record<string, unknown>) => {
    const dest =
      typeof to === "string"
        ? to
        : `${to.pathname}${to.params ? " (params)" : ""}`;
    console.log("🚙 Router(V2)", {
      from: pathname,
      to: dest,
      ...(typeof to === "string"
        ? {}
        : { pathname: to.pathname, params: to.params }),
      ...extra,
    });
  };
  // router
  const pushTo = (pathname: Route) => {
    logging(pathname);
    resetOverlays();
    router.push({ pathname });
  };

  const replaceTo = (pathname: Route) => {
    logging(pathname);
    resetOverlays();
    router.replace({ pathname });
  };

  const pushToHome = () => {
    logging("/");
    resetOverlays();
    router.push({ pathname: "/" });
  };

  const navigateToHome = () => {
    logging("/");
    resetOverlays();
    router.navigate("/" as Route);
  };

  const goBack = () => {
    if (router.canGoBack()) {
      logging("(back)", {
        action: "back",
        backTo: getBackTargetFromNavigator(navigation as Navigation, 1),
      });
      router.back();
      return;
    }
    logging(
      { pathname: "/(tabs)/home/rent" },
      {
        action: "replace",
        reason: "no_history",
        backTo: {
          type: "fallback",
          pathname: "/(tabs)/home/rent",
          reason: "no_history",
        },
      },
    );
    router.replace({ pathname: "/" });
  };
  // return
  return {
    pushTo,
    replaceTo,
    pushToHome,
    navigateToHome,
    goBack,
  };
};
