import { IconBrandGithub } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContents}>
				<div>
					{/* <div>Made with ♥ by Faith Unfeigned</div> */}
					<div className={styles.links}>
						<Link to="/">Home</Link> <span>·</span>{" "}
						<Link to="/support">Support</Link> <span>·</span>{" "}
						<Link to="/info">Info</Link> <span>·</span>{" "}
						<Link to="/privacy-policy">Privacy Policy</Link>
					</div>
				</div>
				<div className={styles.icons}>
					<a
						href="https://github.com/Faith-UnFeigned/cis-web"
						target="_blank"
						rel="noopener noreferrer"
					>
						<IconBrandGithub />
					</a>
				</div>
			</div>
		</footer>
	);
}
