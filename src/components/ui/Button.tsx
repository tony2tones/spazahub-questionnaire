export default function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600 hover:cursor-pointer ${props.className}`}
    >
      {children}
    </button>
  );
}