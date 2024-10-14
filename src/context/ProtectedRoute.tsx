import { useSelector } from "react-redux";

import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import { FC, ReactNode } from "react";
import { Role } from "../pages/users/types";

type ProtectedRouteProps = {
  children: ReactNode;
  roles: Role[];
}
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { profile } = useSelector((state: RootState) => state.userProfile);

  if (!profile) {
    return <Navigate to={'/login'} />
  }
  if (!roles.includes(profile.role)) {
    return <Navigate to={'/Unauthorized'} />
  }

  return children;
}