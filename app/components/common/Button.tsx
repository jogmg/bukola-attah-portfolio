import Link from "next/link";

interface IButton {
  text: string;
  href?: string;
  onClick?: (e: any) => void;
  className: string;
}

export default function Button({ text, href, onClick, className }: IButton) {
  return href ? (
    <Link href={href} onClick={onClick}>
      <button className={className}>{text}</button>
    </Link>
  ) : (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}
