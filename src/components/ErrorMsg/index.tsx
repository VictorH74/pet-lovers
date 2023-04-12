const ErrorMsg = ({ children }: { children: string }) => (
  <p className="text-right uppercase text-red-600 text-xs font-semibold">
    {children}
  </p>
);

export default ErrorMsg;
