import { useState } from "react";

interface ReviewFormProps {
	onSubmit: (content: string) => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
	const [content, setContent] = useState("");

	const handleSubmit = () => {
		if (!content.trim()) return;

		onSubmit(content);
		setContent("");
	};

	const disabledButton = content.trim().length === 0;

	return (
		<div>
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="후기를 작성해주세요."
				rows={4}
			/>
			<button
				type="button"
				onClick={handleSubmit}
				disabled={disabledButton}>{`>`}</button>
		</div>
	);
}
