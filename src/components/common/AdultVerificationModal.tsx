// src/components/common/AdultVerificationModal.tsx
import ConfirmDialog from "./ConfirmDialog.tsx";

interface AdultVerificationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export default function AdultVerificationModal({
	isOpen,
	onClose,
	onConfirm,
}: AdultVerificationModalProps) {
	return (
		<ConfirmDialog
			isOpen={isOpen}
			onClose={onClose}
			onConfirm={onConfirm}
			title={
				<>
					해당 공연은 <span className="text-red-500">성인 전용</span>{" "}
					공연입니다.
				</>
			}
			description="민감한 콘텐츠가 포함되어 있습니다. 정말 들어가시겠습니까?"
			confirmText="들어가기"
			cancelText="뒤로가기"
			confirmColor="blue"
			icon={
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
			}
		/>
	);
}
