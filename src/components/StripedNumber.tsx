interface StripedNumberProps {
  digit: string;
  size?: string; // Tailwind font size class
}

const StripedNumber = ({ digit, size = "text-[8rem]" }: StripedNumberProps) => {
  return (
    <span
      className={`inline-block ${size} font-bold leading-none relative text-transparent`}
      style={{
        WebkitTextStroke: '1.5px white',
        WebkitTextFillColor: 'transparent',
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          white,
          white 2px,
          transparent 2px,
          transparent 6px
        )`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
      }}
    >
      {digit}
    </span>
  );
};

export default StripedNumber;
