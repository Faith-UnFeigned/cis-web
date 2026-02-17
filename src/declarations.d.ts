declare module "*.module.scss" {
	const content: Record<string, string>;
	export default content;
}

interface Document {
	webkitFullscreenEnabled?: boolean;
	mozFullscreenEnabled?: boolean;
	msFullscreenEnabled?: boolean;
}
