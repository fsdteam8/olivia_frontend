"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      if (!res.ok) {
        throw new Error("Subscription failed");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Subscribed successfully 🎉");
      setEmail("");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter email");
      return;
    }

    subscribeMutation.mutate(email);
  };

  return (
    <section
      style={{
        backgroundImage: 'url("/joinus.jpeg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl text-white mb-4">
          Subscribe to Our Newsletter
        </h2>

        <p className="text-white/80 text-sm font-medium mb-12">
          Be the first to discover meaningful opportunities, community updates,
          and resources shaping a sustainable future.
        </p>

        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-xl shadow-lg">
          <Input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-none bg-transparent focus-visible:ring-0 text-slate-800 placeholder:text-slate-400 font-medium h-12"
          />

          <Button
            onClick={handleSubscribe}
            disabled={subscribeMutation.isPending}
            className="bg-[#0D3B3F] hover:bg-[#164e53] text-white px-8 h-12 rounded-lg font-black text-sm uppercase tracking-wide"
          >
            {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
      </div>
    </section>
  );
};
