// Headless UI의 Dialog 컴포넌트는 모달의 모든 기능과 접근성을 처리합니다.
// Transition 컴포넌트는 부드러운 애니메이션 효과를 위해 사용됩니다.
import { Dialog, Transition } from "@headlessui/react";
// Fragment는 불필요한 DOM 노드를 생성하지 않고 여러 요소를 그룹화할 때 사용합니다.
import { Fragment } from "react";

// 컴포넌트가 외부(페이지)로부터 받아야 할 props의 목록과 타입입니다.
interface AdultVerificationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export default function AdultVerificationModal({
	isOpen, // 모달의 열림/닫힘 상태
	onClose, // 모달을 닫는 함수
	onConfirm, // 확인/인증을 처리하는 함수
}: AdultVerificationModalProps) {
	return (
		// Transition 컴포넌트는 `show` prop이 바뀔 때 애니메이션을 적용합니다.
		<Transition appear show={isOpen} as={Fragment}>
			{/* Dialog 컴포넌트가 모달의 핵심입니다. onClose는 배경 클릭 시 실행됩니다. */}
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				{/* 모달 배경 (블러 + 반투명 오버레이) */}
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					{/* 해당 div가 바로 블러 효과와 반투명 배경을 만듭니다. */}
					<div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
				</Transition.Child>

				{/* 실제 모달 콘텐츠 */}
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
							{/* Dialog.Panel이 흰색 패널 부분입니다. */}
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-center shadow-xl transition-all">
								{/* Dialog.Title은 화면 낭독기가 "모달 제목"으로 인식합니다. */}
								<Dialog.Title
									as="h3"
									className="text-xl font-bold leading-6 text-gray-900">
									해당 공연은 <span className="text-red-500">성인 전용</span>{" "}
									공연입니다.
								</Dialog.Title>

								<div className="mt-2">
									<p className="text-sm text-gray-500">
										민감한 콘텐츠가 포함되어 있습니다. 정말 들어가시겠습니까?
									</p>
								</div>

								<div className="mt-8 flex justify-center gap-x-4">
									<button
										type="button"
										className="w-32 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-200"
										onClick={onClose}>
										뒤로가기
									</button>
									<button
										type="button"
										className="w-32 rounded-lg bg-blue-100 px-4 py-2.5 text-sm font-medium text-blue-900 hover:bg-blue-200"
										onClick={onConfirm}>
										들어가기
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
