import Link from "next/link";
import { useRouter } from "next/router";

function normalizePath(pathname = "") {
  return pathname.split("?")[0].split("#")[0];
}

export function NavLink({ href, className, exact = false, ...props }) {
  const router = useRouter();
  const currentPath = normalizePath(router.asPath || router.pathname || "/");
  const targetPath = normalizePath(href);
  const isActive = exact ? currentPath === targetPath : currentPath.startsWith(targetPath);
  const resolvedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return <Link href={href} className={resolvedClassName} {...props} />;
}
