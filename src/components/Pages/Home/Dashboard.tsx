"use client";

import { setToken } from "@/redux/features/authSlices";
import { useGetUserQuery } from "@/redux/features/user/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
 

export default function Dashboard({ token }: { token: string }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToken(token));
  }, [token, dispatch]);

  const { data, isLoading, error } = useGetUserQuery(2);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user</p>;

  const u = data.data;

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-6">Dashboard (Redux Toolkit + Fetch)</h1>

      <div className="flex items-center gap-6">
        <img src={u.avatar} className="rounded-full" width={100} />
        <div>
          <p><strong>Name:</strong> {u.first_name} {u.last_name}</p>
          <p><strong>Email:</strong> {u.email}</p>
        </div>
      </div>
    </div>
  );
}
