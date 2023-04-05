import { User } from "@prisma/client";

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

export const formatAddress = (location: string) => {
  let locationArray = location.split("__");
  return {
    lat: Number(locationArray[0]),
    lng: Number(locationArray[1]),
    address: locationArray[2],
  }
}

export const formatPhone = (phone: string): string => {
  let phoneArray = phone.split("");
  let ddd = phoneArray.slice(0, 2).join("")
  let number = phoneArray.slice(2);
  number.splice(5, 0, "-")
  number.splice(1, 0, ".")
  return `(${ddd}) ${number.join("")}`
}

export const formatUser = (user: Partial<User>) => {
  if (user.location) return { ...user, location: formatAddress(user.location) }

  return user
}

export const getBaseUrl = (req: any) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${protocol}://${host}`;
}