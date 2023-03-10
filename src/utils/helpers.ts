import { User } from "@prisma/client";

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

export const formatAddress = (address: string) => {
  let addressArray = address.split("__");
  let formattedData: { [key: string]: string } = {};
  addressArray.forEach(data => {
    let [key, value] = data.split("=");
    if (key !== undefined && value !== undefined) {
      formattedData[key] = value;
    }
  });
  return formattedData;
}

export const formatUser = (user: Partial<User>) => {
  if (user.address) return { ...user, address: formatAddress(user.address) }

  return user
}