export default function CartIcon({
  width = 100,
  height = 100,
  color = "#00c950",
}: {
  width?: number;
  height?: number;
  color?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 110 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <g id="cart-icon">
        {/* Cart body outline */}
        <path
          d="M 25 30 L 30 65 L 80 65 L 89 37"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Horizontal lines inside cart */}
        <line x1="27" y1="37" x2="86" y2="37" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="27.5" y1="44" x2="82.5" y2="44" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* <line x1="28" y1="51" x2="82" y2="51" stroke={color} strokeWidth="2" strokeLinecap="round" /> */}
        {/* <line x1="28.5" y1="58" x2="81.5" y2="58" stroke={color} strokeWidth="2.5" strokeLinecap="round" /> */}

        {/* Handle */}
        <path d="M 8 25 L 24 30" stroke={color} strokeWidth="3.5" strokeLinecap="round" />

        {/* Base line */}
        <line x1="30" y1="65" x2="80" y2="65" stroke={color} strokeWidth="3.5" strokeLinecap="round" />

        {/* Wheels */}
        <circle cx="37" cy="75" r="4" stroke={color} strokeWidth="2" fill="none" />
        <circle cx="73" cy="75" r="4" stroke={color} strokeWidth="2" fill="none" />

        {/* Ground line */}
        <line x1="15" y1="85" x2="95" y2="85" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
