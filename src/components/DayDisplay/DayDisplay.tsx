export default function DayDisplay() {
  return (
    <div className="p-4">
      <table className="calendar-table | mt-4">
        <thead className="bg-white z-30">
          {/* sticky top-[72px] */}
          <tr>
            <td className="w-32"></td>
            <td className="w-32">
              <div className="flex flex-col items-center text-zinc-500">
                <p className="font-bold text-5xl">01</p>
                <p className="font-bold">lun</p>
                <div className="h-6 w-[1px] bg-zinc-500"></div>
              </div>
            </td>
            <td className="w-32">
              <div className="flex flex-col items-center text-black">
                <p className="font-bold text-5xl">02</p>
                <p className="font-bold">lun</p>
                <div className="h-6 w-[1px] bg-black"></div>
              </div>
            </td>
            <td className="w-32">
              <div className="flex flex-col items-center text-zinc-500">
                <p className="font-bold text-5xl">03</p>
                <p className="font-bold">lun</p>
                <div className="h-6 w-[1px] bg-zinc-500"></div>
              </div>
            </td>
            <td className="w-32">
              <div className="flex flex-col items-center text-zinc-500">
                <p className="font-bold text-5xl">04</p>
                <p className="font-bold">lun</p>
                <div className="h-6 w-[1px] bg-zinc-500"></div>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b relative">
            <td className="text-sm text-zinc-500 w-24">01 am</td>
            <td className="bg-red-500 absolute top-4 rounded-lg p-2">
              existir
            </td>
          </tr>
          <tr className="border-b">
            <td className="text-sm text-zinc-500">02 am</td>
          </tr>
          <tr className="border-b">
            <td className="text-sm text-zinc-500">03 am</td>
          </tr>
          <tr className="border-b">
            <td className="text-sm text-zinc-500">04 am</td>
          </tr>
          <tr className="border-b">
            <td className="text-sm text-zinc-500">05 am</td>
          </tr>
          <tr className="border-b">
            <td className="text-sm text-zinc-500">06 am</td>
          </tr>
          <tr className="border-b">
            <td className="text-sm text-zinc-500">07 am</td>
          </tr>
          <tr className="border-b">
            <td className="text-sm text-zinc-500">08 am</td>
          </tr>
          <tr className="border-b">
            <td className="text-sm text-zinc-500">09 am</td>
          </tr>
          <tr className="border-b">
            <td className="text-sm text-zinc-500">10 am</td>
          </tr>
          <tr className="border-b">
            <td className="text-sm text-zinc-500">11 am</td>
          </tr>
          <tr className="border-b">
            <td className="text-sm text-zinc-500">12 am</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
