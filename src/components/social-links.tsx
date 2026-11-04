import { ArrowUpRight } from "lucide-react";
import { socials } from "@/data/site";
export function SocialIcon({ name }: { name: string }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      {name === "Instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
        </>
      ) : name === "Facebook" ? (
        <path
          fill="currentColor"
          stroke="none"
          d="M14 22v-9h3l.5-4H14V7c0-1.2.5-2 2-2h2V1.5c-.8-.1-1.8-.2-3-.2-3 0-5 1.9-5 5.2V9H7v4h3v9z"
        />
      ) : (
        <>
          <rect x="2" y="5" width="20" height="14" rx="4" />
          <path d="m10 9 6 3-6 3z" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}
export default function SocialLinks({ text = false }: { text?: boolean }) {
  return (
    <div
      className={`social-links ${text ? "social-links-text" : ""}`}
      aria-label="Digital Empire social media"
    >
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Digital Empire on ${social.label} (opens in a new tab)`}
        >
          <SocialIcon name={social.label} />
          {text && (
            <>
              <span>{social.label}</span>
              <ArrowUpRight size={14} />
            </>
          )}
        </a>
      ))}
    </div>
  );
}
