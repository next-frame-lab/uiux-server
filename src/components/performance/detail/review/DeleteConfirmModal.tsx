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
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
						<svg
							className="w-6 h-6 text-red-600"
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
					</div>
					<div className="flex-1">
						<h3 className="text-xl font-bold text-gray-900">리뷰 삭제</h3>
					</div>
				</div>

				<p className="text-gray-600 mb-6 leading-relaxed">
					정말로 이 리뷰를 삭제하시겠습니까?
					<br />
					<span className="font-semibold text-gray-800">
						삭제된 리뷰는 복구할 수 없습니다.
					</span>
				</p>

				<div className="flex gap-3">
					<button
						type="button"
						onClick={onClose}
						className="flex-1 px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all">
						취소
					</button>
					<button
						type="button"
						onClick={onConfirm}
						className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-md">
						삭제
					</button>
				</div>
			</div>
		</div>
	);
}
