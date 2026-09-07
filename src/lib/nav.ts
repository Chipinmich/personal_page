export interface NavItem {
  href: string;
  label: string;
  /** Short description used by the mobile menu. */
  description: string;
}

/** Primary navigation, shared by the header, mobile menu and footer. */
export const navItems: NavItem[] = [
  { href: "/", label: "Home", description: "Overview and latest work" },
  { href: "/projects", label: "Projects", description: "Things I've built" },
  { href: "/lab", label: "Lab", description: "Smaller experiments" },
  { href: "/writing", label: "Writing", description: "Notes and posts" },
  { href: "/reading", label: "Reading", description: "Books and papers" },
  { href: "/now", label: "Now", description: "What I'm focused on" },
  { href: "/about", label: "About", description: "Background and contact" },
  { href: "/resume", label: "Resume", description: "Download a copy" },
];

/** True when `pathname` is inside the given nav section. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
