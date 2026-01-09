import ConfirmDialog from "./ConfirmDialog.tsx";

interface DeleteConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export default function DeleteConfirmModal({
	isOpen,
	onClose,
	onConfirm,
}: DeleteConfirmModalProps) {
	return (
		<ConfirmDialog
			isOpen={isOpen}
			onClose={onClose}
			onConfirm={onConfirm}
			title="리뷰 삭제"
			description={
				<>
					정말로 이 리뷰를 삭제하시겠습니까?
					<br />
					<span className="font-semibold text-gray-800">
						삭제된 리뷰는 복구할 수 없습니다.
					</span>
				</>
			}
			confirmText="삭제"
			cancelText="취소"
			confirmColor="red"
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
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
			}
		/>
	);
}
