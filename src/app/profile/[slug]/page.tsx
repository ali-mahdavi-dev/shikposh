"use client";
import React from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ slug: string }>();
  return <p>Post: {params.slug}</p>;
}
