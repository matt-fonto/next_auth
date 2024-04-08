import { PaymentFormWrapper } from "@/components/PaymentForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Home</h2>

      <h2>Stripe Payments</h2>
      <p>Speak Now Hub Premium</p>
      <Link
        href="https://buy.stripe.com/test_aEU14G0HJ3GSaTCdQR"
        target="_blank"
      >
        Get Premium
      </Link>

      <PaymentFormWrapper />
    </main>
  );
}
``;
