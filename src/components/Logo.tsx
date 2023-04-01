const Logo = ({ color }: { color?: string }) => (
  <div className="grid place-content-center">
    <h1
      className={`font-righteous text-2xl text-${color || "slate-50"}`}
    >
      PetLovers
    </h1>
  </div>
);

export default Logo;
