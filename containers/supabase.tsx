import { type ReactNode, useEffect } from "react";

import { useSupabaseStore } from "@stores/supabase";

type SupabaseContainerProps = {
  children: ReactNode;
};

const SupabaseContainer = ({ children }: SupabaseContainerProps) => {
  const checkConnection = useSupabaseStore(state => state.checkConnection);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  return <>{children}</>;
};

export default SupabaseContainer;
