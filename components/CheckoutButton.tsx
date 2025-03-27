"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CheckoutButton() {
  const { isSignedIn } = useUser(); // Get user authentication status
  const router = useRouter();

  const handleCheckout = () => {
    if (isSignedIn) {
      router.push("/checkout"); // Go to checkout if logged in
    }
  };

  return (
    <div>
      {isSignedIn ? (
        <button
          onClick={handleCheckout}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Proceed to Checkout
        </button>
      ) : (
        <SignInButton mode="modal">
          <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
            Login to Proceed
          </button>
        </SignInButton>
      )}
    </div>
  );
}
