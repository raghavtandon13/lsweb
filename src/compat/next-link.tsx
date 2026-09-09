import { Link as RouterLink, type LinkProps } from "react-router-dom";

type Props = Omit<LinkProps, "to"> & { href: string };

export default function Link({ href, ...props }: Props) {
  return <RouterLink to={href} {...props} />;
}
