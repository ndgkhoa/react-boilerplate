export const Regexes = {
  username: /^[a-zA-Z0-9._-]{3,20}$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
  iso8601Regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/,
  approver: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\|[^\r\n]+$/,
};
