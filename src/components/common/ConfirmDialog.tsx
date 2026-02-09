import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface ConfirmDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string | ReactNode;
	description: string | ReactNode;
	confirmText: string;
	cancelText: string;
	confirmColor: "red" | "blue" | "green";
	icon: ReactNode;
}

export default function ConfirmDialog({
	isOpen,
	onClose,
	onConfirm,
	title,
	description,
	confirmText = "확인",
	cancelText = "취소",
	confirmColor = "blue",
	icon,
}: ConfirmDialogProps) {
	const colorClasses = {
		red: "bg-red-600 hover:bg-red-700",
		blue: "bg-blue-600 hover:bg-blue-700",
		green: "bg-green-600 hover:bg-green-700",
	};

	const iconBgClasses = {
		red: "bg-red-100",
		blue: "bg-blue-100",
		green: "bg-green-100",
	};

	const iconColorClasses = {
		red: "text-red-600",
		blue: "text-blue-600",
		green: "text-green-600",
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				{/* 배경 오버레이 */}
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
				</Transition.Child>

				{/* 모달 콘텐츠 */}
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all">
								{/* 아이콘과 제목 */}
								<div className="flex items-center gap-3 mb-4">
									{icon && (
										<div
											className={`w-12 h-12 ${iconBgClasses[confirmColor]} rounded-full flex items-center justify-center flex-shrink-0`}>
											<div className={iconColorClasses[confirmColor]}>
												{icon}
											</div>
										</div>
									)}
									<Dialog.Title
										as="h3"
										className="text-xl font-bold text-gray-900 flex-1">
										{title}
									</Dialog.Title>
								</div>

								{/* 설명 */}
								<div className="mb-6">
									{typeof description === "string" ? (
										<p className="text-gray-600 leading-relaxed">
											{description}
										</p>
									) : (
										description
									)}
								</div>

								{/* 버튼들 */}
								<div className="flex gap-3">
									<button
										type="button"
										onClick={onClose}
										className="flex-1 px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all">
										{cancelText}
									</button>
									<button
										type="button"
										onClick={onConfirm}
										className={`flex-1 px-6 py-3 rounded-xl text-white font-semibold transition-all shadow-md ${colorClasses[confirmColor]}`}>
										{confirmText}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
