import React from "react";
import { Link, Paper, Typography } from "@mui/material";

/**
 * import {
	BlogH6,
	BlogH5,
	BlogCaption,
	BlogCaptionSmall,
	BlogSubtitle,
	BlogBodyText,
}
 */

/**
 * BlogH5: 
 * 	variant="h5"
					component="div"
					sx={{
						color: "text.primary",
						fontSize: "30px",
						fontWeight: "700",
					}}
 * Example: "Community Feed"
 */

/**
 * BlogH6: 
 * 	variant="h6"
					component="div"
					sx={{
						color: "text.primary",
						fontSize: "25px",
						fontWeight: "700",
					}}
 * Example: "Community Feed"
 */

/**
 * BlogCaption
 * variant="caption"
					component="div"
					sx={{
						color: "text.secondary",
						fontSize: "14px",
					}}
* Example: "Recent articles from the community"
 */

/**
 * BlogCaptionSmall
 * variant="caption"
					component="div"
					sx={{
						color: "text.secondary",
						fontSize: "12px",
					}}
* Example: day time in blogpost
 */

/**
 * BlogSubtitle
 * 	component="div"
						variant="subtitle2"
						px={{ lineHeight: 1.2 }}
* Example: name in blog post          
 */

/**
 * BlogBodyText
 * 	variant="body2"
						color="textSecondary"
						component="div"
* Example: content of blog            
 */

export function BlogH7({ sx, ...props }) {
	return (
		<Typography
			variant="h6"
			component="div"
			sx={{
				color: "text.primary",
				fontSize: "20px",
				fontWeight: "700",
				...sx,
			}}
			{...props}
		>
			{props.children}
		</Typography>
	);
}
export function BlogH6({ sx, ...props }) {
	var href = props?.children?.[0] || "";
	href = href.replace(/\s+/g, "-").toLowerCase();
	href = href.replace(/,/g, "");
	href = href.replace(/:/g, "");

	return (
		<Typography
			variant="h6"
			component="div"
			id={href}
			sx={{
				color: "text.primary",
				fontSize: "25px",
				fontWeight: "700",
				...sx,
			}}
			{...props}
		>
			{props.children}
		</Typography>
	);
}

export function BlogH5({ sx, ...props }) {
	return (
		<Typography
			variant="h5"
			component="div"
			sx={{
				color: "text.primary",
				fontSize: "30px",
				fontWeight: "700",
				...sx,
			}}
			{...props}
		>
			{props.children}
		</Typography>
	);
}

export function BlogH4({ sx, ...props }) {
	return (
		<Typography
			variant="h5"
			component="div"
			sx={{
				color: "text.primary",
				fontSize: "35px",
				fontWeight: "800",
				...sx,
			}}
			{...props}
		>
			{props.children}
		</Typography>
	);
}

export function BlogCaption({ sx, ...props }) {
	return (
		<Typography
			variant="caption"
			component="p"
			sx={{
				color: "text.secondary",
				fontSize: "14px",
				...sx,
			}}
			{...props}
		>
			{props.children}
		</Typography>
	);
}

export function BlogCaptionSmall({ sx, ...props }) {
	return (
		<Typography
			variant="caption"
			component="p"
			sx={{
				color: "text.secondary",
				fontSize: "12px",
				...sx,
			}}
			{...props}
		>
			{props.children}
		</Typography>
	);
}

export function BlogSubtitle({ sx, ...props }) {
	return (
		<Typography
			color="textPrimary"
			component="p"
			variant="subtitle2"
			{...props}
			sx={{ ...sx }}
		>
			{props.children}
		</Typography>
	);
}

export function BlogBodyPreviewText({ sx, ...props }) {
	return (
		<Typography
			variant="body2"
			color="textSecondary"
			component="p"
			sx={{ ...sx }}
			{...props}
		>
			{props.children}
		</Typography>
	);
}

export function BlogBodyText({ sx, ...props }) {
	return (
		<Typography
			variant="body2"
			component="p"
			sx={{ fontSize: "14px", ...sx }}
			{...props}
		>
			{props.children}
		</Typography>
	);
}

export function BlogBodyListIem({ sx, ...props }) {
	return (
		<Typography
			variant="body2"
			component="li"
			sx={{ ...sx, fontSize: "14px" }}
			{...props}
		>
			{props.children}
		</Typography>
	);
}
export function BlogBodyBlockQuote({ sx, ...props }) {
	return (
		<Typography
			variant="body2"
			component="blockquote"
			sx={{ ...sx, fontSize: "14px" }}
			{...props}
		>
			{props.children}
		</Typography>
	);
}
export function BlogBodyCode({ sx, ...props }) {
	return (
		<Typography
			variant="body2"
			component="code"
			sx={{ ...sx, fontSize: "14px" }}
			{...props}
		>
			{props.children}
		</Typography>
	);
}

export function BlogBodyLink({ sx, ...props }) {
	return (
		<Link
			underline="none"
			sx={{ ...sx, fontSize: "14px", color: "#4078c0" }}
			{...props}
		>
			{props.children}
		</Link>
	);
}

export function BlogBodyPaper({ sx, ...props }) {
	return (
		<Paper
			component="pre"
			elevation={0}
			sx={{
				...sx,
				fontSize: "14px",
				backgroundColor: "background.beta",
				color: "#fafafa",
				padding: "10px",
			}}
		>
			{props.children}
		</Paper>
	);
}
