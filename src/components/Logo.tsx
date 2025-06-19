import Link from "next/link";

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link href="/" className={`font-display text-4xl font-extrabold tracking-wide text-gray-200 ${className}`}>
      VISION<span className="text-cyan-400">DRIVE</span>
    </Link>
  );
};