export const formatDate = (date: Date | string): string => {
   const d = typeof date === "string" ? new Date(date) : date;

   return new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      dateStyle: "short",
   }).format(d);
};
