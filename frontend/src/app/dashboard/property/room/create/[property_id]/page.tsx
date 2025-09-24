"use client";

import CreateRoom from "@/components/layouts/dashboard/room/create/create-room";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { property_id } = useParams<{ property_id: string }>();

  if (!property_id) return <p className="p-4">Property ID not found</p>;

  return <CreateRoom property_id={property_id} />;
};

export default Page;
