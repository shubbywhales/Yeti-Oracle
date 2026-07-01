     1|'use client';
     2|
     3|import type { ReactNode } from 'react';
     4|
     5|type VideoBackgroundProps = {
     6|  src: string;
     7|  poster?: string;
     8|  className?: string;
     9|  overlayClassName?: string;
    10|  children?: ReactNode;
    11|};
    12|
    13|/**
    14| * Full-bleed ambient video background.
    15| *
    16| * Encodes the easy-to-miss rules for invisible-background bugs:
    17| *   - Wrapper has `relative isolate` (own stacking context) and NO `bg-*`
    18| *   - Video uses `absolute inset-0 z-0` (not `fixed`, not negative z-index)
    19| *   - `autoplay loop muted playsInline` (browsers block autoplay without `muted`)
    20| *   - Optional tint overlay sits above the video, below the content
    21| *
    22| * Use this for hero / page backgrounds where the video sits BEHIND content.
    23| * Do NOT use this for inline product demos, hero thumbnails with controls,
    24| * or modal videos — write a plain `<video>` for those cases.
    25| */
    26|export function VideoBackground({
    27|  src,
    28|  poster,
    29|  className,
    30|  overlayClassName,
    31|  children,
    32|}: VideoBackgroundProps) {
    33|  const wrapperClass = ['relative isolate min-h-screen overflow-hidden', className]
    34|    .filter(Boolean)
    35|    .join(' ');
    36|  const overlayClass = overlayClassName
    37|    ? ['absolute inset-0 z-10', overlayClassName].join(' ')
    38|    : null;
    39|
    40|  return (
    41|    <div className={wrapperClass}>
    42|      <video
    43|        autoPlay
    44|        loop
    45|        muted
    46|        playsInline
    47|        poster={poster}
    48|        aria-hidden="true"
    49|        className="absolute inset-0 z-0 size-full object-cover"
    50|      >
    51|        <source src={src} />
    52|      </video>
    53|      {overlayClass ? <div className={overlayClass} /> : null}
    54|      <div className="relative z-20">{children}</div>
    55|    </div>
    56|  );
    57|}
    58|