import { Link as WouterLink, LinkProps } from 'wouter'

const Link: React.FC<LinkProps> = (props) => {
  return <WouterLink {...props}></WouterLink>
}

export default Link;
