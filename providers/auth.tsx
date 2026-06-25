import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppState } from "react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { useToast } from "@hooks/useToast";
import {
  getSession,
  signOut as signOutService,
  subscribeSessionChange,
} from "@services/auth";
import { getDisplayMessage } from "@utils/errorHandler";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

const INITIAL_USER_INFO: UserInfo = {
  isLoggedIn: false,
  id: null,
  displayName: null,
  name: null,
  email: null,
  phoneNumber: null,
  birthDate: null,
  avatarUrl: null,
  profilePublic: true,
  pinnedStorePublic: true,
};

type Props = {
  children: ReactNode;
};

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export type UserInfo = {
  isLoggedIn: boolean;
  id: string | null;
  displayName: string | null;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  birthDate: string | null;
  avatarUrl: string | null;
  profilePublic: boolean;
  pinnedStorePublic: boolean;
};

export type AuthContextValue = {
  user: UserInfo;
  status: AuthStatus;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: Props) => {
  // hooks
  const { showToast } = useToast();
  // states
  const [user, setUser] = useState<UserInfo>(INITIAL_USER_INFO);
  const [status, setStatus] = useState<AuthStatus>("checking");
  // functions
  const signOut = useCallback(async () => {
    await signOutService();
    setUser(INITIAL_USER_INFO);
    setStatus("unauthenticated");
  }, []);
  // cycle
  useEffect(() => {
    let isMounted = true;
    const refreshSession = async () => {
      setStatus("checking");
      try {
        // 세션 확인
        const session = await getSession();
        // 사용자 정보 초기화
        if (!isMounted) return;
        if (!session?.user) {
          setUser(INITIAL_USER_INFO);
          setStatus("unauthenticated");
          return;
        }
        // 사용자 정보 설정
        const id = session.user.id;
        const displayName = session.user.user_metadata?.display_name;
        const name = session.user.user_metadata?.full_name;
        const email = session.user.email || session.user.user_metadata.email;
        const phoneNumber = session.user.user_metadata?.phone_number;
        const birthDate = session.user.user_metadata?.birth_date;
        const avatarUrl =
          session.user.user_metadata?.new_avatar_url ||
          session.user.user_metadata?.avatar_url;
        const profilePublic =
          session.user.user_metadata?.profile_public ?? true;
        const pinnedStorePublic =
          session.user.user_metadata?.pinned_store_public ?? true;
        setUser({
          isLoggedIn: true,
          id: id,
          displayName: displayName ?? null,
          name: name ?? null,
          email: email ?? null,
          phoneNumber: phoneNumber ?? null,
          birthDate: birthDate ?? null,
          avatarUrl: avatarUrl ?? null,
          profilePublic: profilePublic,
          pinnedStorePublic: pinnedStorePublic,
        });
        setStatus("authenticated");
      } catch (e) {
        // 사용자 정보 초기화
        if (!isMounted) return;
        setUser(INITIAL_USER_INFO);
        setStatus("unauthenticated");
        showToast({
          text: getDisplayMessage(e),
          variant: "error",
        });
      }
    };
    refreshSession();
    // 세션 변경 구독
    const subscription = subscribeSessionChange((_event, session) => {
      if (!isMounted) return;
      if (session?.user) {
        const id = session.user.id;
        const displayName = session.user.user_metadata?.display_name;
        const name = session.user.user_metadata?.full_name;
        const email = session.user.user_metadata.email;
        const phoneNumber = session.user.user_metadata?.phone_number;
        const birthDate = session.user.user_metadata?.birth_date;
        const avatarUrl =
          session.user.user_metadata?.new_avatar_url ||
          session.user.user_metadata?.avatar_url;
        const profilePublic =
          session.user.user_metadata?.profile_public ?? true;
        const pinnedStorePublic =
          session.user.user_metadata?.pinned_store_public ?? true;
        setUser({
          isLoggedIn: true,
          id: id,
          displayName: displayName ?? null,
          name: name ?? null,
          email: email ?? null,
          phoneNumber: phoneNumber ?? null,
          birthDate: birthDate ?? null,
          avatarUrl: avatarUrl ?? null,
          profilePublic: profilePublic ?? true,
          pinnedStorePublic: pinnedStorePublic ?? true,
        });
        setStatus("authenticated");
      } else {
        setUser(INITIAL_USER_INFO);
        setStatus("unauthenticated");
      }
    });
    // 앱 상태 변경 구독
    const appStateSub = AppState.addEventListener("change", nextState => {
      if (nextState === "active") {
        refreshSession();
      }
    });
    // 언마운트 시 구독 해제
    return () => {
      isMounted = false;
      subscription.unsubscribe();
      appStateSub.remove();
    };
  }, []);
  // value
  const value = useMemo(
    () => ({ user, status, signOut }),
    [user, status, signOut],
  );
  // render
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
