const Logo = ({ color, className }: { color?: string, className?: string }) => (
  <div className={"grid place-content-center" + " " + className} >
    <h1
      className={`font-righteous text-2xl text-${color || "slate-50"}`}
    >
      PetLovers
    </h1>
  </div>
);

export default Logo;
