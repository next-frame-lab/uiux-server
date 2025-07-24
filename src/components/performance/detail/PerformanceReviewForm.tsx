import { FormEvent, useState } from "react";

interface ReviewFormProps {
	onSubmit: (content: string) => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
	const [content, setContent] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!content.trim()) return;

		onSubmit(content);
		setContent("");
	};

	const disabledButton = content.trim().length === 0;

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="후기를 작성해주세요."
				rows={4}
			/>
			<button type="submit" disabled={disabledButton}>{`>`}</button>
		</form>
	);
}
