import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const fetchUserSalesReport = async () => {
  const cookieStore = await cookies();
  const token = await cookieStore.get("token")?.value;
  const response = await axios.get(`${BASE_URL}/payment/user/report`, {
    withCredentials: true,
    headers: {
      Cookie: token ? `token=${token}` : "",
    },
  });

  return response.data.data;
};

export default async function UserSalesTable() {
  const userData = await fetchUserSalesReport();
  const columns = [
    { key: "userId", label: "User ID" },
    { key: "name", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "totalBookings", label: "Total Bookings" },
    { key: "totalSpent", label: "Total Spent" },
    { key: "lastBookingDate", label: "Last Booking Date" },
  ];

  return (
    <div className="p-8">
    <h2 className="font-bold mb-3">Your Top Spenders</h2>
    <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-md">
      <table className="w-full border-separate border-spacing-0 text-left">
        <caption className="sr-only">Customer booking overview</caption>
        <thead className="uppercase tracking-wide">
          <tr className="[&>th]:border-r [&>th]:border-[var(--color-border)] [&>th]:last:border-r-0">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="
          px-4 py-4 text-xs font-semibold 
          bg-neutral-100 dark:bg-neutral-800 
          text-neutral-600 dark:text-neutral-300 
          first:rounded-tl-[var(--radius-xl)] last:rounded-tr-[var(--radius-xl)]
        "
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm leading-relaxed text-[var(--color-foreground)]">
          {userData.map((user: any) => (
            <tr
              key={user.userId}
              className="border-b border-[var(--color-border)] last:border-b-0 last:[&>td:first-child]:rounded-bl-[var(--radius-xl)] last:[&>td:last-child]:rounded-br-[var(--radius-xl)]"
            >
              {columns.map((column: any) => (
                <td
                  key={column.key}
                  className="px-4 py-4 font-medium text-[var(--color-foreground)]"
                >
                  {column.key === "totalSpent"
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(user[column.key])
                    : column.key === "lastBookingDate"
                    ? new Date(user[column.key]).toLocaleDateString("en-GB")
                    : user[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
