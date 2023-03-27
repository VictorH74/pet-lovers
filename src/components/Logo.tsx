const Logo = ({ color }: { color?: string }) => (
  <h1 className={`font-righteous text-2xl text-${color || "slate-50"}`}>PetLovers</h1>
);

export default Logo;
