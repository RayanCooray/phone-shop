"use client";

import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { getAllUsers } from "@/lib/actions/User";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.accessToken) {
      fetchUsers(session.user.accessToken);
    }
  }, [session]);

  const fetchUsers = async (accessToken: string) => {
    setLoading(true);
    try {
      const result = await getAllUsers(accessToken);
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.error || "Failed to fetch users");
      }
    } catch (err) {
      setError("An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Users</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table>
            <TableCaption>List of all registered users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id.slice(-6)}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right">
                    <Button className="mr-2" asChild>
                      <Link href={`/admin/users/update/${user._id}`} className="text-blue-500">
                        Update
                      </Link>
                    </Button>
                    <Button className="bg-red-500">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
};

export default Page;
