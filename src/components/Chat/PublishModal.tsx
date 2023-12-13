import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { IconX } from '@tabler/icons-react';
import { ClipboardEvent, MouseEvent, useCallback, useRef } from 'react';

import { useTranslation } from 'next-i18next';

import { getPublishActionByType } from '@/src/utils/app/share';

import { ShareEntity } from '@/src/types/common';
import { SharingType } from '@/src/types/share';
import { Translation } from '@/src/types/translation';

import { useAppDispatch } from '@/src/store/hooks';

import { v4 as uuidv4 } from 'uuid';

interface Props {
  entity: ShareEntity;
  type: SharingType;
  isOpen: boolean;
  onClose: () => void;
}

export default function PublishModal({ entity, isOpen, onClose, type }: Props) {
  const { t } = useTranslation(Translation.SideBar);
  const dispatch = useAppDispatch();
  const publishAction = getPublishActionByType(type);
  const shareId = useRef(uuidv4());

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: () => {
      onClose();
    },
  });
  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([dismiss]);

  const handleClose = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      onClose();
    },
    [onClose],
  );

  const handlePublish = useCallback(
    (e: MouseEvent<HTMLButtonElement> | ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();

      dispatch(
        publishAction({ id: entity.id, shareUniqueId: shareId.current }),
      );
      onClose();
    },
    [dispatch, entity.id, onClose, publishAction],
  );

  return (
    <FloatingPortal id="theme-main">
      <FloatingOverlay
        lockScroll
        className="z-50 flex items-center justify-center bg-gray-900/30 p-3 dark:bg-gray-900/70 md:p-5"
      >
        <FloatingFocusManager context={context}>
          <form
            noValidate
            className="relative inline-block h-[747px] max-h-full min-w-[550px] max-w-[1100px] rounded bg-gray-100 p-6 text-left dark:bg-gray-700"
            role="dialog"
            ref={refs.setFloating}
            {...getFloatingProps()}
            data-qa="publish-modal"
          >
            <button
              type="button"
              role="button"
              className="absolute right-2 top-2 rounded text-gray-500 hover:text-blue-700"
              onClick={handleClose}
            >
              <IconX height={24} width={24} />
            </button>
            <div className="flex h-full flex-col justify-between gap-2">
              <h4 className=" max-h-[50px] text-base font-semibold">
                <span className="line-clamp-2 break-words">
                  {`${t('Publication request for')}: ${entity.name.trim()}`}
                </span>
              </h4>
              <div className="flex justify-end gap-3">
                <button
                  className="button button-secondary"
                  onClick={handleClose}
                  data-qa="cancel"
                >
                  {t('Cancel')}
                </button>
                <button
                  className="button button-primary"
                  onClick={handlePublish}
                  data-qa="publish"
                >
                  {t('Send request')}
                </button>
              </div>
            </div>
          </form>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
}