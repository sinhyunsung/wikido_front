/**
 * Inline citation pill — the source-of-truth marker that appears throughout
 * wiki bodies and LLM answers. Per Implementation.md §6.3, every claim from
 * an LLM answer must render with one of these so users can always trace back.
 */
interface CiteProps {
  n: number;
  src?: string;
}

export function Cite({ n, src }: CiteProps) {
  return (
    <span
      className="inline-flex h-[18px] cursor-pointer items-center gap-1 rounded bg-accent-soft px-1.5 align-middle text-[10.5px] text-accent font-mono mx-0.5 hover:bg-[#dde0f4]"
      title={src}
    >
      [{n}]
    </span>
  );
}
