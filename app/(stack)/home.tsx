import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import Text from "@components/text";
import { useRouter } from "@hooks/useRouter";
import { useSupabase } from "@hooks/useSupabase";
import { UserData } from "@libs/drizzle/schema";
import { useModalStore } from "@stores/modal";
import { flex } from "@theme/styles";
import { supabase } from "@utils/supabase";

/**
 * ===============================
 * Home 스크린
 * ===============================
 */
const HomeScreen = () => {
  // hooks
  const { openModal } = useModalStore();
  const { routeToSearch } = useRouter();
  const { status: supabaseStatus, error: supabaseError } = useSupabase();
  const [userList, setUserList] = useState<UserData[]>([]);

  useEffect(() => {
    if (supabaseStatus !== "connected") return;
    const load = async () => {
      const { data } = await supabase
        .from("users")
        .select("id, full_name, phone");
      const rows: UserData[] = (data ?? []).map(row => ({
        id: row.id,
        fullName: row.full_name ?? null,
        phone: row.phone ?? null,
      }));
      setUserList(rows);
    };
    load().catch(() => setUserList([]));
  }, [supabaseStatus]);

  // render
  return (
    <View style={[flex.full, flex.center]}>
      <Text variant="body-2" customStyles={{ textStyle: { marginBottom: 16 } }}>
        {supabaseStatus === "checking"
          ? "Supabase: 연결 확인 중..."
          : supabaseStatus === "connected"
            ? "Supabase: 연결됨"
            : `Supabase: 연결 실패${supabaseError ? ` — ${supabaseError}` : ""}`}
      </Text>
      {userList.length > 0 && (
        <View style={{ marginBottom: 16 }}>
          <Text
            variant="heading-5"
            customStyles={{ textStyle: { marginBottom: 8 } }}>
            유저 목록
          </Text>
          {userList.map(u => (
            <Text
              key={u.id}
              variant="body-2"
              customStyles={{ textStyle: { marginBottom: 4 } }}>
              {u.fullName ?? "(이름 없음)"}
            </Text>
          ))}
        </View>
      )}
      <Pressable onPress={() => routeToSearch("123")}>
        <Text variant="heading-3">Go to Sample</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          openModal({
            title: "Modal",
            description: "This is a modal",
            primaryButton: {
              text: "Close",
              onClickFunction: () => {
                console.log("Close");
              },
            },
          });
        }}>
        <Text variant="heading-3">Open Modal</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
