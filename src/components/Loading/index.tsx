import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <main className="grid place-items-center h-[90vh]">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#00C898"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
    </main>
  );
}
